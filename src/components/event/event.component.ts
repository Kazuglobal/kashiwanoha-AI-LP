import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

interface ProgramStep {
  id: number;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  illustration: 'orientation' | 'ideation' | 'development' | 'showcase';
  iconLabel: string;
  ariaLabel: string;
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {

  readonly programSteps = signal<ProgramStep[]>([
    {
      id: 1,
      title: 'オリエンテーション',
      description: 'ワークショップの目的を共有し、AIの使い方の基礎を学びます。',
      gradientFrom: '#667eea',
      gradientTo: '#764ba2',
      accentColor: '#7061ff',
      illustration: 'orientation',
      iconLabel: 'コンパスと地図のイラスト',
      ariaLabel: 'ステップ1 オリエンテーション'
    },
    {
      id: 2,
      title: 'アイデアワークショップ',
      description: 'AIに自分の苦手分野をどう学習させ、どう克服を手伝ってもらうか？ユニークなアイデアを出し合い、未来の学習法をデザインします。',
      gradientFrom: '#f093fb',
      gradientTo: '#f5576c',
      accentColor: '#ff6a8c',
      illustration: 'ideation',
      iconLabel: '電球と付箋のイラスト',
      ariaLabel: 'ステップ2 アイデアワークショップ'
    },
    {
      id: 3,
      title: 'パーソナライズスタディアプリ開発体験',
      description: 'メンターのサポートを受けながら、考えたアイデアを基に、実際にアプリのプロトタイプを作成します。',
      gradientFrom: '#43e97b',
      gradientTo: '#38f9d7',
      accentColor: '#3ee4a7',
      illustration: 'development',
      iconLabel: 'スマートフォンとコードブロックのイラスト',
      ariaLabel: 'ステップ3 パーソナライズスタディアプリ開発体験'
    },
    {
      id: 4,
      title: '成果発表・フィードバック',
      description: '作った作品を皆の前で発表し、発信する力を養います。',
      gradientFrom: '#fa709a',
      gradientTo: '#fee140',
      accentColor: '#ffb347',
      illustration: 'showcase',
      iconLabel: 'プレゼンテーション画面とトロフィーのイラスト',
      ariaLabel: 'ステップ4 成果発表・フィードバック'
    }
  ]);
}
