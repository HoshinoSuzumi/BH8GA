import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { noto_sc } from '@/app/[locale]/fonts'
import { ActionBar } from '@/app/[locale]/ActionBar'
import { Providers } from '@/app/[locale]/providers'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { notFound } from 'next/navigation'
import { locales } from '@/navigation'
import { SessionProvider } from 'next-auth/react'

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

  // noinspection HtmlRequiredTitleElement
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      <link rel="me" href="https://mastodon.uniiem.com/@HoshinoSuzumi"/>
    </head>
    <body className={ noto_sc.className }>
    <a rel="me" href="https://mastodon.uniiem.com/@HoshinoSuzumi" style={ { display: 'none' } }>Mastodon</a>
    <SessionProvider>
      <NextIntlClientProvider
        locale={ locale }
        messages={ messages }
      >
        <Providers>
          <ActionBar locale={ locale }/>
          <div className={ 'px-0 sm:px-2' }>
            { children }
          </div>
        </Providers>
      </NextIntlClientProvider>
    </SessionProvider>
    </body>
    </html>
  )
}
