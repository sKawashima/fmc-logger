import type { Metadata } from 'next'
import { Providers } from './providers'
import '../resources/tailwind.css'

export const metadata: Metadata = {
  title: 'FMC Logger',
  description: 'FMCerのための記録管理ツール',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="light">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
