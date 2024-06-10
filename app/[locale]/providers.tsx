'use client'

import { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useRouter } from '@/navigation'

export function Providers({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={ router.push }>
      <NextThemesProvider attribute="class">
        { children }
      </NextThemesProvider>
    </NextUIProvider>
  )
}