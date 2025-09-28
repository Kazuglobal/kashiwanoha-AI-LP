import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { RouterLink } from '@angular/router';
import { Mentor, MentorService } from '../../services/mentor.service';

@Component({
  selector: 'app-mentor',
  standalone: true,
  imports: [NgOptimizedImage, ScrollAnimationDirective, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mentor.component.html',
})
export class MentorComponent {
  private mentorService = inject(MentorService);
  mentors = signal<Mentor[]>([]);

  constructor() {
    this.mentors.set(this.mentorService.getMentors());
  }
}