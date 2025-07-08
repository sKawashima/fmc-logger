import { GlobalLayout } from '@/components/templates/GlobalLayout'
import { getTranslations, getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import 'reset-css'
import './globals.css'
import { Providers } from './providers'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('app')
  const tKeywords = await getTranslations('keywords')

  return {
    title: {
      default: 'FMC Logger',
      template: '%s | FMC Logger',
    },
    description: t('description'),
    keywords: [
      'FMC',
      'Fewest Move Challenge',
      tKeywords('rubiks_cube'),
      tKeywords('speed_cube'),
      tKeywords('record_management'),
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
      description: t('description'),
      siteName: 'FMC Logger',
    },
    twitter: {
      card: 'summary',
      title: 'FMC Logger',
      description: t('description'),
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
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <main className="text-foreground bg-background">
            <GlobalLayout>{children}</GlobalLayout>
          </main>
        </Providers>
      </body>
    </html>
  )
}
