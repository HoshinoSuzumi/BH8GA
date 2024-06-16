import { saira } from '@/app/[locale]/fonts'
import { useTranslations } from 'next-intl'
import Main from '@/app/[locale]/dashboard/send-card/Main'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Send QSL - BH8GA',
}

export default async function Page() {
  return (
    <Main/>
  )
}