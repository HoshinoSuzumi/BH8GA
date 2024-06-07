'use client'

import './ActionBar.scss'
import TablerBuildingBroadcastTower from '@/components/Icons/TablerBuildingBroadcastTower'
import { noto_sc, saira } from '@/app/[locale]/fonts'
import { Link } from '@/navigation'
import { LanguageChanger } from '@/components/LanguageChanger'

export const ActionBar = ({
  locale,
}: {
  locale: string
}) => {
  return (
    <header className={ `action-bar ${ noto_sc.className }` }>
      <Link className={ 'flex items-center gap-2 select-none' } href={ '/' }>
        <TablerBuildingBroadcastTower className={ 'text-2xl' }/>
        <h1 className={ `flex flex-col leading-tight text-xl font-medium ${ saira.className }` }>
          <span>
            <span className={ 'font-bold' }>BH8GA</span>
            <span className={ 'opacity-50' }>&apos;s RADIO</span>
          </span>
          <span className={ 'text-xs' }>
            QSL Gallery & Confirms
          </span>
        </h1>
      </Link>
      <LanguageChanger locale={ locale }/>
    </header>
  )
}