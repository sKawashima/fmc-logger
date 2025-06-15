# Claude Code プロジェクト設定ガイド

このドキュメントは、fmc-loggerプロジェクトでClaude Codeを使用する際の重要な制約事項と設定をまとめたものです。

## 🔧 環境設定

### Node.jsバージョン管理

- **必須**: fnmを使用してNode.js 22を利用すること
- **コマンド**: `fnm use 22`
- **理由**: Next.js 15.3.3はNode.js 22が必要（node:modulesのサポート）

```bash
# 常にこのコマンドでNode.jsバージョンを設定してから作業開始
eval "$(fnm env --shell bash)" && fnm use 22
```

## 📦 パッケージ管理

### パッケージマネージャー

- **使用ツール**: pnpm
- **理由**: HeroUIとの互換性が高く、依存関係の問題を回避できる

## 🎨 UIライブラリ設定

### HeroUI (旧NextUI) の重要事項

1. **Tailwind CSS バージョン**

   - 必ずTailwind CSS v3.xを使用（v4はまだサポートされていない）
   - 現在: v3.4.0

2. **必要なパッケージ**

   ```json
   {
     "@heroui/react": "^2.7.10",
     "@heroui/theme": "^2.4.17"
   }
   ```

3. **設定ファイル**

   - `tailwind.config.mjs` (ESモジュール形式)
   - `postcss.config.mjs` (ESモジュール形式)
   - プラグインは`@heroui/theme`からインポート

4. **コンポーネントの注意点**
   - Buttonコンポーネント: `variant="solid"`を明示的に指定
   - Alertコンポーネント: デフォルトは`flat`なので、背景色が必要な場合は`variant="solid"`を指定

## 🚨 トラブルシューティング手順

### スタイルが適用されない場合

1. Node.jsバージョンを確認: `node --version` (v22.x.xであること)
2. `.next`ディレクトリを削除: `rm -rf .next`
3. 開発サーバーを再起動
4. HeroUIの最新ドキュメントを確認（APIが頻繁に更新される）

### ビルドエラーの場合

1. fnmでNode.js 22を使用しているか確認
2. `pnpm install`で依存関係を再インストール
3. ESモジュール形式の設定ファイル（.mjs）を使用しているか確認

## 📚 情報源の優先順位

1. **公式ドキュメント**: https://heroui.com/docs/

   - HeroUIは頻繁に更新されるため、常に最新のドキュメントを参照
   - 特にTailwind CSS v4対応状況を確認

2. **GitHub Issues**: https://github.com/heroui-inc/heroui/issues

   - 既知の問題や回避策を確認

3. **Stack Overflow**:
   - NextUI/HeroUI + Next.js 15の組み合わせの問題を検索

## 🔍 調査時の注意点

- HeroUIは以前NextUIという名前だったため、両方の名前で検索する
- Next.js 15は比較的新しいため、バージョン固有の問題に注意
- Tailwind CSS v4との互換性問題は開発中のため、定期的に確認

## 💡 開発のベストプラクティス

1. **カスタムCSSクラスの使用を避ける**

   - HeroUIの標準コンポーネントとTailwindのユーティリティクラスを優先

2. **コンポーネントのvariant指定**

   - 明示的にvariantを指定して、期待する見た目を確実に実現

3. **キャッシュのクリア**
   - スタイル関連の変更後は`.next`ディレクトリを削除して再ビルド

## 🔄 更新履歴

- 2024-06-15: 初版作成
  - HeroUIスタイル適用問題の解決
  - Node.js 22環境の設定
  - カスタムクラスの削除とHeroUIコンポーネントへの移行
