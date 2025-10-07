import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

interface ProgramStep {
  title: string;
  description: string;
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  standalone: true,
  imports: [ScrollAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {
  programSteps = signal<ProgramStep[]>([
    {
      title: 'オリエンテーション',
      description: 'ワークショップの目的を共有し、AIの使い方の基礎を学びます。'
    },
    {
      title: 'アイデアワークショップ',
      description: 'AIに自分の苦手分野をどう学習させ、どう克服を手伝ってもらうか？ユニークなアイデアを出し合い、未来の学習法をデザインします。'
    },
    {
      title: 'パーソナライズスタディアプリ開発体験',
      description: 'メンターのサポートを受けながら、考えたアイデアを基に、実際にアプリのプロトタイプを作成します。'
    },
    {
      title: '成果発表・フィードバック',
      description: '作った作品を皆の前で発表し、発信する力を養います。'
    }
  ]);
}