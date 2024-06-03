import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { noto_sc } from '@/app/fonts'
import { ActionBar } from '@/app/ActionBar'

export const metadata: Metadata = {
  title: `BH8GA`,
  description: `BH8GA's bio and QSOs.`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={ noto_sc.className }>
    <ActionBar />
    { children }
    </body>
    </html>
  )
}
