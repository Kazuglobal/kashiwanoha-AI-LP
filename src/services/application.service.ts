import { Injectable } from '@angular/core';
import { supabase, WorkshopApplication } from '../lib/supabase';
import { environment } from '../environments/environment';

type EnvRecord = Record<string, string | undefined>;

const metaEnv: EnvRecord | undefined =
  typeof import.meta !== 'undefined' && (import.meta as { env?: EnvRecord }).env
    ? (import.meta as { env?: EnvRecord }).env
    : undefined;

const nodeEnv: EnvRecord | undefined =
  typeof process !== 'undefined' ? (process.env as EnvRecord) : undefined;

const resolveEnvValue = (keys: string[], source?: EnvRecord): string | undefined => {
  if (!source) {
    return undefined;
  }

  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  return undefined;
};

const GAS_WEBHOOK_URL =
  resolveEnvValue(['NG_APP_GAS_WEBHOOK_URL', 'VITE_GAS_WEBHOOK_URL', 'GAS_WEBHOOK_URL'], metaEnv) ??
  resolveEnvValue(['NG_APP_GAS_WEBHOOK_URL', 'VITE_GAS_WEBHOOK_URL', 'GAS_WEBHOOK_URL'], nodeEnv) ??
  environment.notifications?.gasWebhookUrl ??
  '';

const GAS_RECIPIENT =
  resolveEnvValue(['NG_APP_GAS_RECIPIENT', 'VITE_GAS_RECIPIENT', 'GAS_RECIPIENT'], metaEnv) ??
  resolveEnvValue(['NG_APP_GAS_RECIPIENT', 'VITE_GAS_RECIPIENT', 'GAS_RECIPIENT'], nodeEnv) ??
  environment.notifications?.recipientEmail ??
  'globalbunny77@gmail.com';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  /**
   * ワークショップ参加申し込みをSupabaseに保存
   * @param application 参加申し込みデータ
   * @returns Promise<void>
   * @throws Error if submission fails
   */
  async submitApplication(application: Omit<WorkshopApplication, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('workshop_applications')
        .insert([application]);

      if (error) {
        console.error('Supabase error:', error);
        const fallbackMessage = '申し込み処理に失敗しました。しばらくしてから再度お試しください。';
        const { message, details, hint, code } = error as { message?: string; details?: string; hint?: string; code?: string };
        const detailParts = [message, details, hint, code ? `コード: ${code}` : undefined]
          .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
          .map(part => part.trim());
        const combinedDetail = detailParts.length > 0 ? detailParts.join(' / ') : undefined;
        throw new Error(combinedDetail ? `${fallbackMessage} (詳細: ${combinedDetail})` : fallbackMessage);
      }

      await this.notifyGoogleAppsScript(application);

      console.log('Application submitted successfully');
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  }

  /**
   * すべての参加申し込みを取得（管理者用）
   * @returns Promise<WorkshopApplication[]>
   */
  async getApplications(): Promise<WorkshopApplication[]> {
    try {
      const { data, error } = await supabase
        .from('workshop_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('申し込み一覧の取得に失敗しました。');
      }

      return data || [];
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  private async notifyGoogleAppsScript(
    application: Omit<WorkshopApplication, 'id' | 'created_at' | 'updated_at' | 'status'>
  ): Promise<void> {
    if (!GAS_WEBHOOK_URL) {
      console.log('GAS webhook URL not configured, skipping notification');
      return;
    }

    const payload = {
      ...application,
      recipient: GAS_RECIPIENT,
      submittedAt: new Date().toISOString(),
      source: 'application-form',
    };

    try {
      console.log('Sending notification to GAS:', GAS_WEBHOOK_URL);
      console.log('Payload:', payload);
      
      // CORS対応のための複数の方法を試行
      const response = await this.fetchWithCorsRetry(GAS_WEBHOOK_URL, payload);
      
      console.log('GAS response received:', response);
      
      if (response.ok) {
        const responseText = await response.text();
        console.log('GAS response body:', responseText);
      } else {
        console.warn(`GAS webhook returned ${response.status}: ${response.statusText}`);
      }
    } catch (notifyError) {
      console.warn('GAS notification failed', notifyError);
      // エラーが発生してもフォーム送信は成功として扱う
    }
  }

  /**
   * CORS問題を回避するための複数のfetch方法を試行
   */
  private async fetchWithCorsRetry(url: string, payload: any): Promise<Response> {
    const methods = [
      // 方法1: 通常のfetch
      () => fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }),
      
      // 方法2: no-cors mode
      () => fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }),
      
      // 方法3: フォームデータとして送信
      () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));
        return fetch(url, {
          method: 'POST',
          body: formData,
        });
      }
    ];

    for (let i = 0; i < methods.length; i++) {
      try {
        console.log(`Trying fetch method ${i + 1}`);
        const response = await methods[i]();
        console.log(`Method ${i + 1} succeeded:`, response);
        return response;
      } catch (error) {
        console.warn(`Method ${i + 1} failed:`, error);
        if (i === methods.length - 1) {
          throw error; // 最後の方法でも失敗した場合はエラーを投げる
        }
      }
    }
    
    throw new Error('All fetch methods failed');
  }
}
