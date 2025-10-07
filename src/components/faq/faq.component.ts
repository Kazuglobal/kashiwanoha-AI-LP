import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [ScrollAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="faq" class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12" appScrollAnimation>
          <h2 class="font-poppins font-black text-3xl md:text-5xl">
            <span class="gradient-text">FAQ</span><br>
            <span class="text-2xl md:text-4xl text-black">よくあるご質問</span>
          </h2>
          <p class="text-lg text-gray-600 mt-4">疑問や不安はここで解決！</p>
        </div>
        <div class="max-w-3xl mx-auto">
          @for (item of faqItems(); track item.question; let i = $index) {
            <div class="border-b border-gray-200" appScrollAnimation [staggerIndex]="i">
              <button (click)="toggle(i)" class="w-full text-left py-6 flex justify-between items-center focus:outline-none focus:bg-gray-50 transition group">
                <span class="text-xl font-semibold text-gray-900 group-hover:gradient-text transition-all">{{ item.question }}</span>
                <span class="transform transition-transform duration-300" [class.rotate-180]="openIndex() === i">
                  <svg class="w-6 h-6 text-gray-500 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
              </button>
              @if (openIndex() === i) {
                <div class="pb-6 px-1">
                  <p class="text-gray-700 leading-relaxed">{{ item.answer }}</p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class FaqComponent {
  openIndex = signal<number | null>(null);

  faqItems = signal<FaqItem[]>([
    {
      question: 'プログラミング未経験でも参加できますか？',
      answer: 'はい、大歓迎です！このワークショップは、プログラミングが初めての方でも楽しめるように設計されています。メンターが丁寧にサポートしますので、ご安心ください。'
    },
    {
      question: '何を持っていけばいいですか？',
      answer: 'ご自身のノートPCまたはタブレットが必須です。また、苦手分野の教科者やPDF資料があればアプリを作りやすいです。'
    },
    {
      question: '作成したアプリは持ち帰れますか？',
      answer: 'はい、ワークショップで作成したアプリのプロトタイプはお持ち帰りいただけます。ご自宅でさらに開発を進めることもできます。'
    },
    
    {
      question: 'キャンセルはできますか？',
      answer: 'キャンセルは前日まで可能です。ただしキャンセルで発生する返金手数料はご負担いただきます。'
    }
  ]);

  toggle(index: number): void {
    this.openIndex.update(current => current === index ? null : index);
  }
}