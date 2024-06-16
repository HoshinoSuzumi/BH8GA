import Main from '@/app/[locale]/dashboard/card-designs/Main'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Card Designs - BH8GA',
}

export default async function Page() {
  return (
    <Main/>
  )
}