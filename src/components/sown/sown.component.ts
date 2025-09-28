import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { NgOptimizedImage } from '@angular/common';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-sown',
  templateUrl: './sown.component.html',
  standalone: true,
  imports: [ScrollAnimationDirective, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SownComponent {
  private applicationService = inject(ApplicationService);
  applicationStatus = signal<'idle' | 'loading' | 'success'>('idle');

  async apply(): Promise<void> {
    if (this.applicationStatus() === 'loading') return;
    
    this.applicationStatus.set('loading');
    try {
      await this.applicationService.submitApplication();
      this.applicationStatus.set('success');
      setTimeout(() => this.applicationStatus.set('idle'), 3000);
    } catch (error) {
      console.error('Application failed', error);
      this.applicationStatus.set('idle');
    }
  }
}
