import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { noto_sc } from '@/app/fonts'
import { ActionBar } from '@/app/ActionBar'
import { Providers } from '@/app/providers'

export const metadata: Metadata = {
  title: `BH8GA`,
  description: `BH8GA's bio and QSOs.`,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={ noto_sc.className }>
    <Providers>
      <ActionBar/>
      { children }
    </Providers>
    </body>
    </html>
  )
}
