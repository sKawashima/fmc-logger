import type { Metadata } from 'next'
import { NextUIProvider } from '@nextui-org/react'

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
    <html lang="ja">
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  )
}
