import { Component, ChangeDetectionStrategy, signal, afterNextRender, viewChild } from '@angular/core';
import { ApplicationFormComponent } from '../application-form/application-form.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ApplicationFormComponent],
})
export class HeroComponent {
  parallaxOffset = signal(0);
  applicationForm = viewChild<ApplicationFormComponent>('applicationForm');

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

  openApplicationForm(): void {
    this.applicationForm()?.openModal();
  }
}
