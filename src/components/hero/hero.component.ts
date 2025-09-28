import { Component, ChangeDetectionStrategy, signal, afterNextRender, inject } from '@angular/core';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeroComponent {
  parallaxOffset = signal(0);
  private applicationService = inject(ApplicationService);
  applicationStatus = signal<'idle' | 'loading' | 'success'>('idle');

  constructor() {
    afterNextRender(() => {
      const onScroll = () => {
        // Only apply parallax if the hero section is in view for performance
        if (window.scrollY < window.innerHeight) {
          // Move the background at half the scroll speed for a subtle effect
          this.parallaxOffset.set(window.scrollY * 0.5);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    });
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
      this.applicationStatus.set('idle'); // reset on error
    }
  }
}
