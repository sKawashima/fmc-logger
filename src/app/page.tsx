import { TopTemplate } from '@/components/templates/TopTemplate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ホーム',
  description:
    'FMC Loggerのホームページ - 今日のスクランブルと最新の記録を確認',
  openGraph: {
    title: 'FMC Logger - ホーム',
    description:
      'FMC Loggerのホームページ - 今日のスクランブルと最新の記録を確認',
  },
}

export default async function Home() {
  return <TopTemplate />
}
