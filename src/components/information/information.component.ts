import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

interface InfoItem {
  title: string;
  value: string;
  icon: string; // SVG path
}

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  standalone: true,
  imports: [ScrollAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  infoItems = signal<InfoItem[]>([
    { title: '日時', value: '11/29(土) 12:30-16:30', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { title: '会場', value: 'UDCK', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM12 11a3 3 0 100-6 3 3 0 000 6z' },
    { title: '参加費', value: '1,500円', icon: 'M9 8h6m-5 4h4m5 4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2z' },
    { title: '定員', value: '20名 (先着順)', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm6-11a4 4 0 10-5.292 0M18 21v-1a6 6 0 00-3-5.354' },
    { title: '主催', value: 'Globalbunny・Rクリエイティブラボ', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-11h1m-1 4h1m-1 4h1' },
  ]);
}