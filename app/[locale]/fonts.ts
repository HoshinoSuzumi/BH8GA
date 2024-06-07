import { Noto_Sans_SC, Rubik, Saira, Pacifico } from 'next/font/google'

export const noto_sc = Noto_Sans_SC({
  subsets: ['cyrillic'],
  display: 'swap',
  variable: '--noto'
})

export const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['__Noto_Sans_SC_c3f2fc', 'sans-serif'],
})

export const saira = Saira({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['__Noto_Sans_SC_c3f2fc', 'sans-serif'],
})

export const pacifico = Pacifico({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  fallback: ['__Noto_Sans_SC_c3f2fc', 'sans-serif'],
})
