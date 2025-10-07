import { Component, ChangeDetectionStrategy, signal, afterNextRender, viewChild } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { ApplicationFormComponent } from '../application-form/application-form.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [ScrollAnimationDirective, ApplicationFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  showBackToTop = signal(false);
  applicationForm = viewChild<ApplicationFormComponent>('applicationForm');

  constructor() {
    afterNextRender(() => {
        const onScroll = () => {
          this.showBackToTop.set(window.scrollY > 400);
        };
        window.addEventListener('scroll', onScroll);
    });
  }
  
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openApplicationForm(): void {
    this.applicationForm()?.openModal();
  }
}
