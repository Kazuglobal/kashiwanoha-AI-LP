# Supabase統合 - 参加フォーム

## 概要

このプロジェクトでは、SupabaseのMCPを利用してワークショップの参加申し込みフォームを実装しました。

## セットアップ済みの内容

### 1. Supabaseプロジェクト
- プロジェクトID: `coypokcshsoawzvhuhxf`
- プロジェクトURL: `https://coypokcshsoawzvhuhxf.supabase.co`

### 2. データベーステーブル
テーブル名: `workshop_applications`

| カラム名 | 型 | 必須 | 説明 |
|---------|-----|------|------|
| id | UUID | ✓ | 主キー（自動生成） |
| name | TEXT | ✓ | 参加者名 |
| furigana | TEXT | ✓ | ふりがな |
| email | TEXT | ✓ | メールアドレス |
| phone | TEXT | ✓ | 電話番号 |
| school_name | TEXT | - | 学校名 |
| grade | TEXT | ✓ | 学年 |
| motivation | TEXT | - | 参加動機 |
| status | TEXT | - | ステータス（pending/confirmed/cancelled） |
| created_at | TIMESTAMPTZ | ✓ | 作成日時 |
| updated_at | TIMESTAMPTZ | ✓ | 更新日時 |

### 3. セキュリティ設定（RLS）
- **INSERT**: 誰でも参加申し込み可能
- **SELECT**: 認証済みユーザー（管理者）のみ閲覧可能

### 4. 実装済みコンポーネント

#### ApplicationFormComponent
`src/components/application-form/`
- モーダル形式の参加申し込みフォーム
- バリデーション機能
- 成功/エラーメッセージ表示
- Supabaseへのデータ保存

#### ApplicationService
`src/services/application.service.ts`
- `submitApplication()`: 参加申し込みを保存
- `getApplications()`: 申し込み一覧を取得（管理者用）

#### 統合済みコンポーネント
- `HeroComponent`: ヒーローセクションの申し込みボタン
- `SownComponent`: 対象者セクションの申し込みボタン

## 使用方法

### 開発環境の起動

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 参加申し込みの流れ

1. ユーザーが「参加申し込み」ボタンをクリック
2. モーダルフォームが表示される
3. 必要事項を入力して送信
4. Supabaseの`workshop_applications`テーブルに保存
5. 成功メッセージが表示され、3秒後にモーダルが閉じる

### 管理者向け：申し込みデータの確認

#### 方法1: Supabase ダッシュボード
1. https://app.supabase.com にアクセス
2. プロジェクト `hachinohekita` を選択
3. Table Editor > `workshop_applications` を確認

#### 方法2: コードから取得
```typescript
import { ApplicationService } from './services/application.service';

// サービスをインジェクト
constructor(private applicationService: ApplicationService) {}

// 申し込み一覧を取得
async loadApplications() {
  const applications = await this.applicationService.getApplications();
  console.log(applications);
}
```

## 環境変数

環境変数は`src/environments/environment.ts`に設定済みです：

```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'https://coypokcshsoawzvhuhxf.supabase.co',
    anonKey: '...'
  }
};
```

## ファイル構成

```
src/
├── components/
│   ├── application-form/
│   │   ├── application-form.component.ts
│   │   └── application-form.component.html
│   ├── hero/
│   │   └── hero.component.ts (更新済み)
│   └── sown/
│       └── sown.component.ts (更新済み)
├── environments/
│   └── environment.ts (新規作成)
├── lib/
│   └── supabase.ts (新規作成)
└── services/
    └── application.service.ts (更新済み)
```

## トラブルシューティング

### エラー: "Failed to fetch"
- ネットワーク接続を確認
- Supabase URLとAPIキーが正しいか確認

### エラー: "Row Level Security policy violated"
- RLSポリシーが正しく設定されているか確認
- テーブルのパーミッションを確認

### データが保存されない
- ブラウザのコンソールでエラーを確認
- Supabaseダッシュボードでテーブルの存在を確認

## 次のステップ

1. **メール通知の実装**: Supabase Edge Functionsを使用して、申し込み時に確認メールを送信
2. **管理画面の作成**: 申し込み一覧を表示・管理する画面
3. **CSV エクスポート**: 申し込みデータをCSVでダウンロード
4. **ステータス管理**: 申し込みの承認/却下機能

## サポート

問題が発生した場合は、Supabaseのドキュメントを参照してください：
- https://supabase.com/docs
- https://supabase.com/docs/guides/database








