import { saira } from '@/app/[locale]/fonts'
import { useTranslations } from 'next-intl'

export default function Main() {
  const t = useTranslations('dash.send')

  return (
    <>
      <div className={ 'px-4 pb-8' }>
        <h1 className={ `text-2xl font-semibold mt-8 mb-4 ${ saira.className }` }>
          { t('page_title') }
        </h1>

      </div>
    </>
  )
}