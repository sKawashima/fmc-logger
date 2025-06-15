import { GlobalLayout } from '@/components/templates/GlobalLayout'
import type { Metadata } from 'next'
import 'reset-css'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'FMC Logger',
    template: '%s | FMC Logger',
  },
  description:
    'FMCerのための記録管理ツール - Fewest Move Challengeの記録と進捗を管理',
  keywords: [
    'FMC',
    'Fewest Move Challenge',
    'ルービックキューブ',
    'スピードキューブ',
    '記録管理',
  ],
  authors: [{ name: 'FMC Logger Team' }],
  creator: 'FMC Logger Team',
  publisher: 'FMC Logger',
  metadataBase: new URL('https://fmc-logger.example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    title: 'FMC Logger',
    description:
      'FMCerのための記録管理ツール - Fewest Move Challengeの記録と進捗を管理',
    siteName: 'FMC Logger',
  },
  twitter: {
    card: 'summary',
    title: 'FMC Logger',
    description: 'FMCerのための記録管理ツール',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  )
}
