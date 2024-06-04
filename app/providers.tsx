'use client'

import { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class">
        { children }
      </NextThemesProvider>
    </NextUIProvider>
  )
}