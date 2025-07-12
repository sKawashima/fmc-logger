import { GlobalLayout } from '@/components/templates/GlobalLayout'
import type { Metadata } from 'next'
import 'reset-css'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: 'FMC Logger',
    template: '%s | FMC Logger',
  },
  description:
    'Record management tool for FMC players - Manage your Fewest Move Challenge records and progress',
  keywords: [
    'FMC',
    'Fewest Move Challenge',
    'Rubiks Cube',
    'Speedcubing',
    'Record Management',
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
    locale: 'en_US',
    url: '/',
    title: 'FMC Logger',
    description:
      'Record management tool for FMC players - Manage your Fewest Move Challenge records and progress',
    siteName: 'FMC Logger',
  },
  twitter: {
    card: 'summary',
    title: 'FMC Logger',
    description: 'Record management tool for FMC players',
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
    <html lang="en">
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
