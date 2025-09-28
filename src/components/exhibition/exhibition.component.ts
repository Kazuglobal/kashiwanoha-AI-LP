import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  standalone: true,
  imports: [ScrollAnimationDirective, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionComponent {}
