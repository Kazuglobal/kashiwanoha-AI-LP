import { Component, ChangeDetectionStrategy, signal, inject, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Mentor, MentorService } from '../../services/mentor.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-mentor-detail',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mentor-detail.component.html',
})
export class MentorDetailComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private mentorService: MentorService = inject(MentorService);

  mentor = signal<Mentor | null>(null);

  constructor() {
    // This effect runs when the component is initialized
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        const mentorData = this.mentorService.getMentorById(+id);
        if (mentorData) {
          this.mentor.set(mentorData);
          // Scroll to the top of the page when mentor data is loaded
          window.scrollTo(0, 0);
        } else {
          this.router.navigate(['/']); // Redirect to home if mentor not found
        }
      } else {
        this.router.navigate(['/']); // Redirect to home if no id is present
      }
    });
  }
}
