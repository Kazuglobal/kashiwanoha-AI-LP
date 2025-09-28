import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

interface NewsItem {
  date: string;
  category: string;
  title: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  standalone: true,
  imports: [ScrollAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {
  newsItems = signal<NewsItem[]>([
    { date: '2025.09.01', category: 'プレスリリース', title: 'TOKYO GAME SHOW 2025、開催概要を発表' },
    { date: '2025.08.25', category: '出展社', title: '出展社リスト第一弾を公開しました' },
    { date: '2025.08.15', category: 'チケット', title: '早期割引チケットの販売を開始しました' },
    { date: '2025.08.01', category: 'イベント', title: 'メインステージのプログラムを発表' },
  ]);
}
