import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { noto_sc } from '@/app/[locale]/fonts'
import { ActionBar } from '@/app/[locale]/ActionBar'
import { Providers } from '@/app/[locale]/providers'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { notFound } from 'next/navigation'
import { locales } from '@/navigation'

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
  params: { locale },
}: Readonly<{
  children: ReactNode
  params: { locale: string }
}>) {
  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = useMessages()

  return (
    <html lang="en" suppressHydrationWarning>
    <body className={ noto_sc.className }>
    <NextIntlClientProvider
      locale={ locale }
      messages={ messages }
    >
      <Providers>
        <ActionBar locale={ locale }/>
        { children }
      </Providers>
    </NextIntlClientProvider>
    </body>
    </html>
  )
}
