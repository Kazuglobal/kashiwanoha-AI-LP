import { createClient } from '@supabase/supabase-js';
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

const supabaseUrl =
  resolveEnvValue(['NG_APP_SUPABASE_URL', 'VITE_SUPABASE_URL', 'SUPABASE_URL'], metaEnv) ??
  resolveEnvValue(['NG_APP_SUPABASE_URL', 'VITE_SUPABASE_URL', 'SUPABASE_URL'], nodeEnv) ??
  environment.supabase.url;

const supabaseAnonKey =
  resolveEnvValue(['NG_APP_SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY'], metaEnv) ??
  resolveEnvValue(['NG_APP_SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY'], nodeEnv) ??
  environment.supabase.anonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('SupabaseのURLまたはAnonキーが設定されていません。NG_APP_SUPABASE_* の環境変数を確認してください。');
}

const decodeBase64Url = (value: string): string | undefined => {
  if (typeof value !== 'string' || value.length === 0) {
    return undefined;
  }

  try {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const paddedLength = Math.ceil(normalized.length / 4) * 4;
    const padded = normalized.padEnd(paddedLength, '=');

    if (typeof atob === 'function') {
      return atob(padded);
    }

    if (typeof Buffer !== 'undefined') {
      return Buffer.from(padded, 'base64').toString('utf-8');
    }
  } catch (error) {
    console.warn('Failed to decode Supabase key payload', error);
  }

  return undefined;
};

const extractProjectRef = (key: string): string | undefined => {
  if (typeof key !== 'string') {
    return undefined;
  }

  const segments = key.split('.');
  if (segments.length < 2) {
    return undefined;
  }

  const payload = decodeBase64Url(segments[1]);
  if (!payload) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(payload) as { ref?: string };
    return typeof parsed.ref === 'string' ? parsed.ref : undefined;
  } catch (error) {
    console.warn('Failed to parse Supabase key payload', error);
    return undefined;
  }
};

const urlHost = (() => {
  try {
    const url = new URL(supabaseUrl);
    const [subdomain] = url.hostname.split('.');
    return subdomain;
  } catch {
    return undefined;
  }
})();

const keyProjectRef = extractProjectRef(supabaseAnonKey);

if (urlHost && keyProjectRef && urlHost !== keyProjectRef) {
  throw new Error(`SupabaseのURL(${urlHost})とAPIキー(${keyProjectRef})のプロジェクトIDが一致しません。正しい組み合わせを設定してください。`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WorkshopApplication {
  id?: string;
  name: string;
  furigana: string;
  email: string;
  phone: string;
  school_name?: string;
  grade: string;
  motivation?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}
