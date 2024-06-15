'use client'

import './ActionBar.scss'
import TablerBuildingBroadcastTower from '@/components/Icons/TablerBuildingBroadcastTower'
import { noto_sc, saira } from '@/app/[locale]/fonts'
import { Link, usePathname } from '@/navigation'
import { LanguageChanger } from '@/components/LanguageChanger'
import { SignIn } from '@/components/auth-components'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export const ActionBar = ({
  locale,
}: {
  locale: string
}) => {
  const t = useTranslations('home')
  const pathname = usePathname()
  const [hideActionbar, setHideActionbar] = useState(false)

  useEffect(() => {
    let lastScrollTop = 0
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop
      setHideActionbar(pathname.startsWith('/posts') && currentScrollTop > 36 && currentScrollTop > lastScrollTop)
      lastScrollTop = currentScrollTop
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return (
    <header
      className={ `action-bar ${ noto_sc.className } ${ hideActionbar && '-translate-y-1/2 opacity-0 pointer-events-none' } transition` }
    >
      <div className={ 'flex justify-between items-center container xl:max-w-[1280px]' }>
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
      </div>
    </header>
  )
}