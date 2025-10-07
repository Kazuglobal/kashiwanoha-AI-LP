import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

interface NewsItem {
  date: string;
  category: string;
  title: string;
  url: string;
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
    { date: '2025.09.01', category: 'プレスリリース', title: 'AIハンズオンワークショップ、開催概要を発表', url: '#details' },
    { date: '2025.08.25', category: 'メンター', title: 'メンター陣を発表しました', url: '#mentors' },
    { date: '2025.08.15', category: '申込', title: '参加申し込みを開始しました', url: '#details' },
    { date: '2025.08.01', category: 'イベント', title: 'プログラム内容を公開', url: '#program' },
  ]);

  getShareUrl(platform: 'twitter' | 'facebook', item: NewsItem): string {
    const currentUrl = window.location.origin + window.location.pathname + item.url;
    const text = encodeURIComponent(item.title);
    
    if (platform === 'twitter') {
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${text}`;
    } else {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    }
  }
}
