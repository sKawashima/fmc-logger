# FMC Logger

[![Build CI](https://github.com/sKawashima/fmc-logger/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/sKawashima/fmc-logger/actions/workflows/ci.yml) ![Last Commit](https://img.shields.io/github/last-commit/sKawashima/fmc-logger/master.svg) ![My FMC Best is 26](https://img.shields.io/badge/My_FMC_Best-26-blue)

A web application for tracking FMC (Fewest Moves Challenge) solutions and daily scrambles.

![](./src/components/atoms/imageCharacter.png)

## Tech Stack

- **Framework**: Next.js with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Prisma adapter
- **Styling**: Tailwind CSS + HeroUI (formerly NextUI)
- **Language**: TypeScript
- **Package Manager**: pnpm

## Environment Setup

### Prerequisites

- **Database**: PostgreSQL (managed via Docker)
- **Package Manager**: pnpm

## Development

```bash
# Install dependencies
pnpm install

# Start development server (Next.js + PostgreSQL)
pnpm dev

# Start only Next.js app
pnpm dev:app

# Start only PostgreSQL database
pnpm dev:db
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Management

```bash
# Run Prisma migrations
pnpm migrate

# Generate Prisma client
pnpm prisma-generate

# Open Prisma Studio
pnpm studio
```

## Code Quality

```bash
# Run linting
pnpm lint

# Format code
pnpm format
```

## Build & Deploy

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Application Features

- **Daily Scrambles**: FMC scrambles generated daily
- **Solution Tracking**: Submit and track your FMC solutions
- **User Profiles**: Public profiles with solution history
- **Authentication**: Secure login with NextAuth.js

## Key Routes

- `/`: Today's scramble challenge
- `/user/setId`: Set your public user ID
- `/user/[userid]`: User profile pages
- `/scramble/[id]`: Individual scramble pages

For more detailed development instructions, see `CLAUDE.md`.
