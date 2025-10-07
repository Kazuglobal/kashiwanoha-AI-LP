import { Component, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { ApplicationFormComponent } from '../application-form/application-form.component';

@Component({
  selector: 'app-sown',
  templateUrl: './sown.component.html',
  standalone: true,
  imports: [ScrollAnimationDirective, ApplicationFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SownComponent {
  applicationForm = viewChild<ApplicationFormComponent>('applicationForm');

  openApplicationForm(): void {
    this.applicationForm()?.openModal();
  }
}
