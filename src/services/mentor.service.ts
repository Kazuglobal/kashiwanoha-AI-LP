import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

export interface Mentor {
  id: number;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  isBase64?: boolean;
  longDescription: string;
  xUsername?: string;
  website?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  private mentors = signal<Mentor[]>([
    {
      id: 1,
      name: '大舘和史',
      title: '教育×AI、スポーツ×AI、人材育成',
      description: '教育×AI、スポーツ×AI、国際交流の専門家。新たな学びの創造とグローバル人材の育成に取り組む。',
      imageUrl: '/public/mentors/odate-kazufumi.png',
      longDescription: `モットー：「未来をつくる - Creating the future」

新たな形の学びの創造、AIやテクノロジーを活用した教育革新、国際交流を通じた世界との繋がりの創出に力を入れている。Global Bunnyを運営し、多様性を尊重したグローバル人材の育成に取り組む。

主な実績
■登壇・発表実績
・教育AIサミット2025 衆議院第一会館登壇
・教育AIサミット実例大全 ポスターセッション発表
・東京AI祭2025ハッカソンセミファイナル

■メディア掲載実績
・東奥日報（2025年9月22日）- 自作防災アプリ小学校ワークショップ
・デーリー東北（2025年9月20日）- 防災教育の革新的取り組み
・デーリー東北（2024年8月）- スポーツ×AI特集

■教育プログラムとワークショップ実績
・革新的教育プラットフォーム：デジタル水族館
子どもの創造力と環境教育の融合を実現。子どもたちが描いた魚がスクリーン上でリアルタイムに泳ぎ出すインタラクティブな海洋環境シミュレーション。
・AI時代の教育プログラム人材育成（茨城県開催）
・東京大学院生メンターによる直接指導：実用英語、発信力

■ワークショップ実施実績
・環境問題ワークショップ（小学生）
・防災アプリワークショップ（小学校での実践的防災教育）
・デジタルブック作成ワークショップ（小学生）
・スマートシティと夏休み2024（満席）
・スマートシティと冬休み2024（満席）
・スマートシティと夏休み2025（満席）
・シリコンバレー企業ミートアップ開催（柏の葉）`,
      website: 'https://globalbunny.vercel.app/'
    },
    {
      id: 2,
      name: 'R太郎',
      title: 'Webアプリ開発者 / AI教育者',
      description: '非エンジニアから独学で年間70本以上のWebアプリを開発。生成AIの可能性と実践的な活用法を発信中。',
      imageUrl: '/public/mentors/r-taro.png',
      longDescription: '非エンジニアから独学で年間70本以上のWebアプリや創作コンテンツを開発。\n2025年にはシリコンバレーへ渡り、自作アプリを発表するなど活動の舞台を世界へ広げる。\n\n「日本中に輝く目を」をビジョンに掲げ、生成AIの可能性と実践的な活用法を発信中。\n\n実績\n• Cursorアプリ開発ハッカソン MVP受賞\n• 東京AI祭2025ハッカソンセミファイナル\n• 教育AIサミット2025 登壇（国会議事堂隣・衆議院議員会館）\n• 北海道自治体職員向け 生成AI研修 講師\n• AIエージェントユーザー会（AIAU） 登壇\n• ChatGPT研究所オフ会 登壇\n• そのほか企業研修・勉強会・イベント多数',
      xUsername: 'masukusoro',
      website: 'http://R-TARO.com'
    },
  ]);

  getMentors(): Mentor[] {
    return this.mentors();
  }

  getMentorById(id: number): Mentor | undefined {
    return this.mentors().find(m => m.id === id);
  }
}
