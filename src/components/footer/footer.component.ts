import { Component, ChangeDetectionStrategy, signal, afterNextRender, inject } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [ScrollAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  showBackToTop = signal(false);
  private applicationService = inject(ApplicationService);
  applicationStatus = signal<'idle' | 'loading' | 'success'>('idle');

  constructor() {
    afterNextRender(() => {
        const onScroll = () => {
          this.showBackToTop.set(window.scrollY > 400);
        };
        window.addEventListener('scroll', onScroll);
    });
  }
  
  scrollToTop(): void {
    window.scrollTo({ top: 0 });
  }

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
