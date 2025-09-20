# 📝 Kei Blog - 管理ダッシュボード

**Kei Blog**は、Next.js 14 の App Router を使用して構築されたモダンなブログ管理システムのバックエンドダッシュボードです。TypeScript、MongoDB、NextAuth.js を活用し、直感的で効率的なブログ管理機能を提供します。

## 🚀 主な機能

### 📊 ダッシュボード機能

- **統計表示**: 公開済みブログ数、下書き数、カテゴリ別集計
- **データ可視化**: Chart.js を使用した月別ブログ作成数のグラフ表示
- **リアルタイム分析**: カテゴリ別ブログ分布の詳細分析

### 📝 ブログ管理機能

- **CRUD 操作**: ブログの作成、読み取り、更新、削除
- **検索機能**: タイトルによるブログ検索
- **ページネーション**: 効率的なデータ表示（1 ページあたり 7 件）
- **ステータス管理**: 公開/下書き状態の管理
- **カテゴリ・タグ管理**: 柔軟な分類システム

### 🔐 認証・セキュリティ

- **Google OAuth**: NextAuth.js による安全な認証
- **セッション管理**: 自動ログイン状態の維持
- **ルート保護**: 未認証ユーザーの自動リダイレクト

### 🎨 UI/UX 機能

- **レスポンシブデザイン**: あらゆるデバイスに対応
- **アニメーション**: AOS（Animate On Scroll）による滑らかなアニメーション
- **モダン UI**: 直感的で美しいユーザーインターフェース
- **ローディング状態**: 適切なフィードバック表示

## 🛠️ 技術スタック

### フロントエンド

- **Next.js 14**: App Router、Server Components
- **React 18**: 最新の React 機能を活用
- **TypeScript**: 型安全性の確保
- **Tailwind CSS**: ユーティリティファーストの CSS
- **Chart.js**: データ可視化
- **React Icons**: 豊富なアイコンライブラリ
- **AOS**: スクロールアニメーション

### バックエンド

- **Next.js API Routes**: RESTful API エンドポイント
- **MongoDB**: NoSQL データベース
- **Mongoose**: MongoDB ODM
- **NextAuth.js**: 認証フレームワーク

### 開発ツール

- **TypeScript**: 静的型チェック
- **ESLint**: コード品質管理
- **Prettier**: コードフォーマット

## 📁 プロジェクト構造

```
backend_admin_dashboard/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # 認証関連API
│   │   │   └── [...nextauth]/    # NextAuth.js設定
│   │   └── blogs/                # ブログ管理API
│   │       └── route.ts          # CRUD操作エンドポイント
│   ├── blogs/                    # ブログ管理ページ
│   │   ├── addblog/              # ブログ作成
│   │   ├── delete/[id]/          # ブログ削除
│   │   ├── edit/[id]/            # ブログ編集
│   │   └── page.tsx              # ブログ一覧
│   ├── draft/                    # 下書き管理
│   ├── login/                    # ログインページ
│   ├── setting/                  # 設定ページ
│   ├── globals.css               # グローバルスタイル
│   ├── layout.tsx                # ルートレイアウト
│   └── page.tsx                  # ダッシュボード
├── components/                    # 再利用可能コンポーネント
│   ├── AuthProvider.tsx          # 認証プロバイダー
│   ├── Header.tsx                # ヘッダーコンポーネント
│   ├── Aside.tsx                 # サイドバーコンポーネント
│   ├── Blog.tsx                  # ブログ表示コンポーネント
│   ├── Loading.tsx               # ローディングコンポーネント
│   └── ...                       # その他のコンポーネント
├── hooks/                        # カスタムフック
│   └── useFetchData.ts           # データ取得フック
├── lib/                          # ユーティリティライブラリ
│   └── mongoose.ts               # MongoDB接続設定
├── models/                       # データモデル
│   └── Blog.ts                   # ブログスキーマ
├── types/                        # TypeScript型定義
│   └── index.ts                  # 共通型定義
└── public/                       # 静的ファイル
    └── img/                      # 画像リソース
```

## 🚀 セットアップとインストール

### 前提条件

- Node.js 18.0 以上
- MongoDB（ローカルまたは MongoDB Atlas）
- Google OAuth 認証情報

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd backend_admin_dashboard
```

### 2. 依存関係のインストール

```bash
npm install
# または
yarn install
# または
pnpm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
# MongoDB接続文字列
MONGODB_URI=mongodb://localhost:27017/your-database-name
# またはMongoDB Atlasの場合
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# NextAuth.js設定
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth認証情報
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
```

### 4. Google OAuth 設定

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成または既存のプロジェクトを選択
3. 「認証情報」→「認証情報を作成」→「OAuth 2.0 クライアント ID」
4. アプリケーションの種類を「ウェブアプリケーション」に設定
5. 承認済みのリダイレクト URI に `http://localhost:3000/api/auth/callback/google` を追加
6. クライアント ID とクライアントシークレットを取得し、環境変数に設定

### 5. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認してください。

## 📖 使用方法

### ログイン

1. アプリケーションにアクセス
2. 「Login with Google」ボタンをクリック
3. Google アカウントで認証

### ダッシュボード

- **統計カード**: 公開済みブログ数、下書き数、カテゴリ数、タグ数を表示
- **月別グラフ**: Chart.js を使用したブログ作成数の可視化
- **カテゴリ別分析**: 各カテゴリのブログ数を表形式で表示

### ブログ管理

1. **ブログ一覧**: `/blogs`で公開済みブログを確認
2. **検索**: タイトルによる検索機能
3. **編集**: 各ブログの編集ボタンから修正
4. **削除**: 削除ボタンからブログを削除
5. **新規作成**: `/blogs/addblog`で新しいブログを作成

### 下書き管理

- `/draft`で下書き状態のブログを管理

## 🔧 API エンドポイント

### ブログ管理 API (`/api/blogs`)

#### GET `/api/blogs`

- **説明**: すべてのブログを取得
- **クエリパラメータ**:
  - `id` (optional): 特定のブログ ID を指定
- **レスポンス**: ブログ配列または単一ブログオブジェクト

#### POST `/api/blogs`

- **説明**: 新しいブログを作成
- **リクエストボディ**:

```json
{
  "title": "ブログタイトル",
  "slug": "blog-slug",
  "description": "ブログの説明",
  "blogcategory": ["カテゴリ1", "カテゴリ2"],
  "tags": ["タグ1", "タグ2"],
  "status": "publish" // または "draft"
}
```

#### PUT `/api/blogs`

- **説明**: 既存のブログを更新
- **リクエストボディ**:

```json
{
  "_id": "ブログID",
  "title": "更新されたタイトル",
  "slug": "updated-slug",
  "description": "更新された説明",
  "blogcategory": ["カテゴリ1"],
  "tags": ["タグ1"],
  "status": "publish"
}
```

#### DELETE `/api/blogs?id={blogId}`

- **説明**: ブログを削除
- **クエリパラメータ**: `id` - 削除するブログの ID

### 認証 API (`/api/auth/[...nextauth]`)

- **説明**: NextAuth.js による認証処理
- **サポート**: Google OAuth

## 🗄️ データベーススキーマ

### Blog モデル

```typescript
interface IBlog {
  _id: string; // MongoDB ObjectId
  title: string; // ブログタイトル
  slug: string; // URL用スラッグ
  description: string; // ブログの説明
  blogcategory: string[]; // カテゴリ配列
  tags: string[]; // タグ配列
  status: string; // "publish" または "draft"
  createdAt: Date; // 作成日時
  updatedAt: Date; // 更新日時
}
```

## 🎨 カスタマイズ

### スタイリング

- `app/globals.css`でグローバルスタイルを管理
- Tailwind CSS クラスを使用したユーティリティファーストのスタイリング
- カスタム CSS クラスでブランド固有のスタイルを定義

### コンポーネント

- `components/`ディレクトリ内のコンポーネントを編集して機能を拡張
- TypeScript の型安全性を活用したコンポーネント開発

### データベース

- `models/Blog.ts`でスキーマを変更
- 新しいフィールドの追加や既存フィールドの修正が可能

## 🚀 デプロイメント

### Vercel（推奨）

1. GitHub リポジトリにコードをプッシュ
2. [Vercel](https://vercel.com)でプロジェクトをインポート
3. 環境変数を設定
4. 自動デプロイが実行される

### その他のプラットフォーム

- **Netlify**: 静的サイトとしてデプロイ
- **Railway**: フルスタックアプリケーションとしてデプロイ
- **AWS/GCP/Azure**: カスタムサーバー環境でデプロイ

### 環境変数の設定（本番環境）

本番環境では以下の環境変数を必ず設定してください：

```env
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_ID=your-production-google-client-id
GOOGLE_SECRET=your-production-google-client-secret
```

## 🧪 開発とテスト

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm run start

# リント実行
npm run lint

# 型チェック
npm run type-check
```

### コード品質

- ESLint によるコード品質チェック
- TypeScript による型安全性の確保
- Prettier によるコードフォーマット

## 🤝 貢献

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は `LICENSE` ファイルを参照してください。

## 📞 サポート

質問や問題がある場合は、以下の方法でサポートを受けることができます：

- **Issues**: GitHub の Issues ページでバグレポートや機能リクエスト
- **Discussions**: GitHub の Discussions ページで質問や議論
- **Email**: プロジェクトメンテナーに直接連絡

## 🔄 更新履歴

### v1.0.0 (2024-01-XX)

- 初回リリース
- 基本的なブログ管理機能
- Google OAuth 認証
- ダッシュボード機能
- レスポンシブデザイン

## 🙏 謝辞

このプロジェクトは以下のオープンソースライブラリを使用しています：

- [Next.js](https://nextjs.org/) - React フレームワーク
- [MongoDB](https://www.mongodb.com/) - データベース
- [NextAuth.js](https://next-auth.js.org/) - 認証
- [Chart.js](https://www.chartjs.org/) - データ可視化
- [Tailwind CSS](https://tailwindcss.com/) - CSS フレームワーク
- [React Icons](https://react-icons.github.io/react-icons/) - アイコンライブラリ

---

**Kei Blog 管理ダッシュボード**で、効率的で美しいブログ管理体験をお楽しみください！ 🚀
