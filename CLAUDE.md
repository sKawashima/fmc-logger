# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Development
pnpm dev                    # Start development server (Next.js app + PostgreSQL via Docker)
pnpm dev:app               # Start only Next.js development server
pnpm dev:db                # Start only PostgreSQL database

# Build & Production
pnpm build                 # Build the Next.js application
pnpm start                 # Start production server

# Code Quality
pnpm lint                  # Run ESLint
pnpm format                # Format code with Prettier

# Database Management
pnpm migrate               # Run Prisma migrations (format, migrate dev, generate)
pnpm prisma-generate       # Generate Prisma client
pnpm studio                # Open Prisma Studio for database management
```

## High-Level Architecture

### Tech Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Prisma adapter
- **Styling**: Tailwind CSS v3 + HeroUI (formerly NextUI)
- **Language**: TypeScript
- **Package Manager**: pnpm

### Database Schema

- **User**: Authenticated users with optional showId for public profile
- **Scramble**: Daily FMC (Fewest Moves Challenge) scrambles
- **Solution**: User solutions with scores and comments
- **Auth Models**: Account, Session, VerificationToken (NextAuth.js)

### Key Application Routes

- `/`: Home page with today's scramble challenge
- `/user/setId`: Set user's public ID
- `/user/[userid]`: User profile page
- `/scramble/[id]`: Individual scramble page with solution form

## Environment Setup

### Node.jsバージョン管理

- **必須**: fnmを使用してNode.js 22を利用すること
- **コマンド**: `fnm use 22`
- **理由**: Next.js 15.3.3はNode.js 22が必要（node:modulesのサポート）

```bash
# 常にこのコマンドでNode.jsバージョンを設定してから作業開始
eval "$(fnm env --shell bash)" && fnm use 22
```

## UI Library Configuration

### HeroUI (formerly NextUI) Critical Setup

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

## Project-Specific Constraints

### Authentication Configuration

- NextAuth.js is configured with Prisma adapter
- OAuth providers need to be configured in environment variables
- User sessions are stored in PostgreSQL

### Form Handling

- Server Actions are used for form submissions (App Router pattern)
- Example: `FormSetUserId` and `FormInputSolutionAnswer` use server actions

### Rubik's Cube Libraries

- `scrambo`: Generate WCA-standard scrambles
- `cubejs`: Cube manipulation and validation
- `cube-notation-normalizer`: Normalize FMC notation

## Troubleshooting

### スタイルが適用されない場合

1. Node.jsバージョンを確認: `node --version` (v22.x.xであること)
2. `.next`ディレクトリを削除: `rm -rf .next`
3. 開発サーバーを再起動
4. HeroUIの最新ドキュメントを確認（APIが頻繁に更新される）

### ビルドエラーの場合

1. fnmでNode.js 22を使用しているか確認
2. `pnpm install`で依存関係を再インストール
3. ESモジュール形式の設定ファイル（.mjs）を使用しているか確認

## Important Notes

1. **公式ドキュメント**: https://heroui.com/docs/
   - HeroUIは頻繁に更新されるため、常に最新のドキュメントを参照
   - 特にTailwind CSS v4対応状況を確認

2. **GitHub Issues**: https://github.com/heroui-inc/heroui/issues
   - 既知の問題や回避策を確認

3. **Stack Overflow**:
   - NextUI/HeroUI + Next.js 15の組み合わせの問題を検索

- When searching for HeroUI documentation, also search for "NextUI" as it was recently renamed
- Next.js 15 is relatively new, be aware of version-specific issues
- Tailwind CSS v4 compatibility with HeroUI is still in development
