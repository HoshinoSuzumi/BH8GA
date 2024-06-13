'use client'

import './ActionBar.scss'
import TablerBuildingBroadcastTower from '@/components/Icons/TablerBuildingBroadcastTower'
import { noto_sc, saira } from '@/app/[locale]/fonts'
import { Link } from '@/navigation'
import { LanguageChanger } from '@/components/LanguageChanger'
import { SignIn } from '@/components/auth-components'
import { useTranslations } from 'next-intl'

export const ActionBar = ({
  locale,
}: {
  locale: string
}) => {
  const t = useTranslations('home')
  return (
    <header className={ `action-bar ${ noto_sc.className }` }>
      <Link className={ 'flex items-center gap-2 select-none' } href={ '/' }>
        <TablerBuildingBroadcastTower className={ 'text-2xl' }/>
        <h1 className={ `flex flex-col leading-tight text-xl font-medium ${ saira.className }` }>
          <span>
            <span className={ 'font-bold' }>BH8GA</span>
            <span className={ 'opacity-50' }>&apos;s values</span>
          </span>
          <span className={ 'text-xs' }>
            { t('my_internet_oasis') }
          </span>
        </h1>
      </Link>
      <div className={ 'flex items-center gap-2' }>
        <SignIn/>
        <LanguageChanger locale={ locale }/>
      </div>
    </header>
  )
}