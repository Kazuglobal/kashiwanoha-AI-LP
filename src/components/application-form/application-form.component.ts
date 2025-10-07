import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { WorkshopApplication } from '../../lib/supabase';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './application-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationFormComponent {
  isOpen = signal(false);
  applicationStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  errorMessage = signal<string>('');

  formData = signal<Omit<WorkshopApplication, 'id' | 'created_at' | 'updated_at' | 'status'>>({
    name: '',
    furigana: '',
    email: '',
    phone: '',
    school_name: '',
    grade: '',
    motivation: ''
  });

  constructor(private applicationService: ApplicationService) {}

  openModal(): void {
    this.isOpen.set(true);
    this.resetForm();
  }

  closeModal(): void {
    this.isOpen.set(false);
    this.resetForm();
  }

  resetForm(): void {
    this.formData.set({
      name: '',
      furigana: '',
      email: '',
      phone: '',
      school_name: '',
      grade: '',
      motivation: ''
    });
    this.applicationStatus.set('idle');
    this.errorMessage.set('');
  }

  async submitForm(): Promise<void> {
    if (this.applicationStatus() === 'loading') return;

    const data = this.formData();
    
    // バリデーション
    if (!data.name || !data.furigana || !data.email || !data.phone || !data.grade) {
      this.errorMessage.set('必須項目を入力してください。');
      return;
    }

    this.applicationStatus.set('loading');
    this.errorMessage.set('');

    try {
      await this.applicationService.submitApplication(data);
      this.applicationStatus.set('success');
      
      // 3秒後にモーダルを閉じる
      setTimeout(() => {
        this.closeModal();
      }, 3000);
    } catch (error) {
      console.error('Application submission error:', error);
      this.applicationStatus.set('error');
      this.errorMessage.set(error instanceof Error ? error.message : '申し込み処理に失敗しました。');
      
      // 5秒後にエラーをリセット
      setTimeout(() => {
        this.applicationStatus.set('idle');
        this.errorMessage.set('');
      }, 5000);
    }
  }

  updateField(field: keyof typeof this.formData.prototype, value: string): void {
    this.formData.update(data => ({ ...data, [field]: value }));
  }
}


