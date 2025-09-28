import { Component, ChangeDetectionStrategy, signal, effect, inject, afterNextRender } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeaderComponent {
  scrolled = signal(false);
  menuOpen = signal(false);

  // FIX: Explicitly type injected properties to help with type inference.
  private document: Document = inject(DOCUMENT);
  private router: Router = inject(Router);
  
  constructor() {
    afterNextRender(() => {
        const onScroll = () => {
          this.scrolled.set(this.document.documentElement.scrollTop > 50);
        };
        this.document.addEventListener('scroll', onScroll);
    });

    effect(() => {
      if (this.menuOpen()) {
        this.document.body.style.overflow = 'hidden';
      } else {
        this.document.body.style.overflow = 'auto';
      }
    });
  }

  toggleMenu(): void {
    this.menuOpen.update(value => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const fragment = sectionId.substring(1);

    const scrollLogic = () => {
      // If we are on a detail page, navigate to home with the fragment.
      // Otherwise, scroll smoothly on the current page.
      if (this.router.url.startsWith('/mentors')) {
        this.router.navigate(['/'], { fragment });
      } else {
        const element = this.document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    
    // If mobile menu is open, close it first, then scroll/navigate.
    if (this.menuOpen()) {
      this.closeMenu();
      setTimeout(scrollLogic, 150);
    } else {
      scrollLogic();
    }
  }
}
