import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

interface PickupItem {
  icon: string; // SVG path data
  title: string;
  description:string;
}

@Component({
  selector: 'app-pickup',
  standalone: true,
  imports: [ScrollAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="pickup" class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12" appScrollAnimation>
          <h2 class="font-poppins font-black text-3xl md:text-5xl">
            <span class="gradient-text">PICK UP</span><br>
            <span class="text-2xl md:text-4xl text-black">本ワークショップの魅力</span>
          </h2>
          <p class="text-lg text-gray-600 mt-4">AIと共に、学びの未来を体験しよう</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          @for (item of pickupItems(); track item.title; let i = $index) {
            <div class="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300" appScrollAnimation [staggerIndex]="i">
              <div class="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white mx-auto mb-6">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="item.icon"></path></svg>
              </div>
              <h3 class="text-2xl font-bold font-poppins text-gray-900 mb-3">{{ item.title }}</h3>
              <p class="text-gray-600">{{ item.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class PickupComponent {
  pickupItems = signal<PickupItem[]>([
    {
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      title: 'アイデアを形に',
      description: 'AIを活用して、あなたのユニークな学習アプリのアイデアを具現化。プロトタイプ作成までを体験できます。'
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      title: 'プロから学ぶ',
      description: 'シリコンバレーでの経験も持つ現役AIエンジニアや教育のプロが直接指導。現場のリアルな知識が手に入ります。'
    },
    {
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      title: '初心者でも安心',
      description: 'プログラミング未経験者、大歓迎！発想力を重視したワークショップで、誰でも楽しく参加できます。'
    },
  ]);
}
