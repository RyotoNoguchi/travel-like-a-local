# Chromatic Visual Regression Testing Setup

このプロジェクトでは、ChromaticによるVisual Regression Testing（ビジュアル回帰テスト）を導入しています。

## 🚀 セットアップ方法

### 1. ローカル環境の設定

1. `.env.local`ファイルを作成し、Chromaticプロジェクトトークンを設定：

```bash
cp .env.local.example .env.local
```

2. `.env.local`ファイルを編集し、実際のプロジェクトトークンを設定：

```env
CHROMATIC_PROJECT_TOKEN=chpt_689c4861f995305
```

### 2. GitHub Secretsの設定

GitHub リポジトリの Settings > Secrets and variables > Actions から以下のSecretを追加：

- `CHROMATIC_PROJECT_TOKEN`: ChromaticプロジェクトトークンWF

## 📝 使用方法

### ローカルでのテスト実行

```bash
# Storybookの起動
npm run storybook

# Chromaticへのアップロード（ローカル）
npm run chromatic

# CI用コマンド（変更があってもエラーで終了しない）
npm run chromatic:ci
```

### 自動化されたワークフロー

以下の条件で自動的にChromaticテストが実行されます：

- **Pull Request作成時**: Visual Regression Testが実行され、変更点をレビュー
- **mainブランチへのpush**: ベースラインの自動更新
- **developブランチへのpush**: テストのみ実行

## 🔍 Visual Regression Testing のワークフロー

### 1. 開発時

1. 新しいコンポーネントやUIの変更を実装
2. 対応するStoryファイルを作成/更新
3. Pull Requestを作成
4. Chromaticで自動的にVisual Regression Testが実行される

### 2. レビュー時

1. ChromaticのPRコメントでvisual changesを確認
2. 意図した変更の場合：Chromaticで「Accept」
3. 意図しない変更の場合：コードを修正してpush

### 3. マージ時

- mainブランチへのマージ時に新しいベースラインが自動設定される

## 📁 Storyファイルの作成ガイドライン

### 基本的なStoryの構造

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from './ComponentName'

const meta = {
  title: 'atoms/ComponentName', // Atomic Design階層に従う
  component: ComponentName,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof ComponentName>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // デフォルトのprops
  }
}

export const Variant: Story = {
  args: {
    // バリエーションのprops
  }
}
```

### Atomic Design階層

- `atoms/`: ボタン、入力フィールドなどの基本要素
- `molecules/`: atomsを組み合わせた簡単なコンポーネント群
- `organisms/`: moleculesを組み合わせた複雑なコンポーネントセクション

## ⚙️ 設定ファイル

### `chromatic.config.json`

プロジェクトの設定は`chromatic.config.json`で管理：

- `onlyChanged`: 変更されたStoryのみテスト（パフォーマンス最適化）
- `exitZeroOnChanges`: 変更があってもCIを失敗させない
- `pauseAnimationAtEnd`: アニメーション終了時に一時停止
- `delay`: スクリーンショット撮影前の待機時間

### `.github/workflows/chromatic.yml`

GitHub ActionsでのCI/CD設定：

- Node.js 20を使用
- npm ciでの依存関係インストール
- Storybookビルドのキャッシュ
- PRとmain/developブランチでのトリガー

## 🔧 トラブルシューティング

### よくある問題

1. **環境変数が設定されていない**

   ```bash
   Error: Missing required option '--project-token'
   ```

   → `.env.local`にトークンが設定されているか確認

2. **Storybookのビルドに失敗**

   ```bash
   npm run build-storybook
   ```

   → エラーメッセージを確認してStoryファイルの構文をチェック

3. **GitHub Actionsでトークンエラー**
   → GitHub SecretsにCHROMATIC_PROJECT_TOKENが設定されているか確認

### パフォーマンスの最適化

- Storyファイルで不要なpropsは設定しない
- アニメーションがある場合は`pauseAnimationAtEnd`を活用
- `onlyChanged: true`で変更されたもののみテスト

## 📚 参考リンク

- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Storybook Documentation](https://storybook.js.org/docs/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
