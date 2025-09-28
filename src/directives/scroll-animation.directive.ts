import { Directive, ElementRef, inject, OnInit, OnDestroy, input } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private observer!: IntersectionObserver;

  staggerIndex = input<number>(0);
  baseDelay = input<number>(150);

  ngOnInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, options);
    
    const element = this.elementRef.nativeElement as HTMLElement;
    element.classList.add('scroll-anim');
    element.style.transitionDelay = `${this.staggerIndex() * this.baseDelay()}ms`;
    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
