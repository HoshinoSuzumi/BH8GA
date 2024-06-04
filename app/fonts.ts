import { Noto_Sans_SC, Rubik, Saira, Pacifico } from 'next/font/google'

export const noto_sc = Noto_Sans_SC({
  subsets: ['cyrillic'],
  display: 'swap',
})

export const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Noto Sans SC', 'sans-serif'],
})

export const saira = Saira({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Noto Sans SC', 'sans-serif'],
  adjustFontFallback: true,
})

export const pacifico = Pacifico({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  fallback: ['Noto Sans SC', 'sans-serif'],
})
