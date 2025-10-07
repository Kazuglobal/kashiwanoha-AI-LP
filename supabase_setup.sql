-- ワークショップ申し込みテーブルの作成
CREATE TABLE IF NOT EXISTS workshop_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  furigana TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  school_name TEXT,
  grade TEXT NOT NULL,
  motivation TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- メンターテーブルの作成（将来的にデータベースから取得する場合）
CREATE TABLE IF NOT EXISTS mentors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_base64 BOOLEAN DEFAULT FALSE,
  long_description TEXT NOT NULL,
  x_username TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックスの作成
CREATE INDEX IF NOT EXISTS idx_workshop_applications_email ON workshop_applications(email);
CREATE INDEX IF NOT EXISTS idx_workshop_applications_status ON workshop_applications(status);
CREATE INDEX IF NOT EXISTS idx_workshop_applications_created_at ON workshop_applications(created_at DESC);

-- updated_at自動更新のトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- workshop_applicationsテーブルのトリガー
DROP TRIGGER IF EXISTS update_workshop_applications_updated_at ON workshop_applications;
CREATE TRIGGER update_workshop_applications_updated_at
  BEFORE UPDATE ON workshop_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- mentorsテーブルのトリガー
DROP TRIGGER IF EXISTS update_mentors_updated_at ON mentors;
CREATE TRIGGER update_mentors_updated_at
  BEFORE UPDATE ON mentors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) の設定
ALTER TABLE workshop_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;

-- workshop_applications用のポリシー
-- 誰でも申し込みを挿入できる
CREATE POLICY "Anyone can insert applications" ON workshop_applications
  FOR INSERT
  WITH CHECK (true);

-- 認証済みユーザーのみが全ての申し込みを閲覧できる（管理者用）
CREATE POLICY "Authenticated users can view all applications" ON workshop_applications
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- 認証済みユーザーのみが申し込みを更新できる（管理者用）
CREATE POLICY "Authenticated users can update applications" ON workshop_applications
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- mentors用のポリシー
-- 誰でもメンター情報を閲覧できる
CREATE POLICY "Anyone can view mentors" ON mentors
  FOR SELECT
  USING (true);

-- 認証済みユーザーのみがメンター情報を挿入・更新できる（管理者用）
CREATE POLICY "Authenticated users can insert mentors" ON mentors
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update mentors" ON mentors
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- サンプルメンターデータの挿入（オプション）
INSERT INTO mentors (name, title, description, image_url, is_base64, long_description, x_username, website)
VALUES
  (
    '大舘和史',
    '教育×AI、スポーツ×AI、人材育成',
    '教育×AI、スポーツ×AI、国際交流の専門家。新たな学びの創造とグローバル人材の育成に取り組む。',
    'https://picsum.photos/seed/oodate1/400/400',
    false,
    'モットー：「未来をつくる - Creating the future」

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
・シリコンバレー企業ミートアップ開催（柏の葉）',
    null,
    'https://globalbunny.vercel.app/'
  ),
  (
    'R太郎',
    'Webアプリ開発者 / AI教育者',
    '非エンジニアから独学で年間70本以上のWebアプリを開発。生成AIの可能性と実践的な活用法を発信中。',
    'data:image/png;base64,...',
    true,
    '非エンジニアから独学で年間70本以上のWebアプリや創作コンテンツを開発。
2025年にはシリコンバレーへ渡り、自作アプリを発表するなど活動の舞台を世界へ広げる。

「日本中に輝く目を」をビジョンに掲げ、生成AIの可能性と実践的な活用法を発信中。

実績
• Cursorアプリ開発ハッカソン MVP受賞
• 東京AI祭2025ハッカソンセミファイナル
• 教育AIサミット2025 登壇（国会議事堂隣・衆議院議員会館）
• 北海道自治体職員向け 生成AI研修 講師
• AIエージェントユーザー会（AIAU） 登壇
• ChatGPT研究所オフ会 登壇
• そのほか企業研修・勉強会・イベント多数',
    'masukusoro',
    'http://R-TARO.com'
  )
ON CONFLICT DO NOTHING;
