import { Main } from '@/app/[locale]/gallery/Main'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QSL Gallery - BH8GA',
  description: 'QSL Gallery of BH8GA',
}

export default function Page() {
  return (
    <Main/>
  )
}