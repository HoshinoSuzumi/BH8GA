import Main from '@/app/[locale]/dashboard/card-designs/Main'
import useSWR from 'swr'
import { CardDesign } from '@/app/actions/types'

export default async function Page() {
  return (
    <Main/>
  )
}