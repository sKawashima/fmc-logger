import { GlobalLayout } from '@/components/templates/GlobalLayout'
import type { Metadata } from 'next'
import 'reset-css'

export const metadata: Metadata = {
  title: 'FMC Logger',
  description: 'FMCerのための記録管理ツール',
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
