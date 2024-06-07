'use client'

import { ReactNode } from 'react'
import { noto_sc, saira } from '@/app/[locale]/fonts'

export const ContactCard = ({
  title,
  icon,
  content,
  className,
  notoFont = false,
  href,
}: {
  title: string
  icon: ReactNode
  content: ReactNode
  className?: string
  notoFont?: boolean
  href: string
}) => {
  return (
    <div
      onClick={ () => {
        if (href) window.open(href, '_blank')
      } }
      className={ `px-4 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 bg-gradient-to-br overflow-hidden relative group cursor-pointer ${ className }` }
    >
      <div className={ 'flex flex-col justify-between gap-1 pr-16 relative' }>
        <h1
          className={ `text-primary-800 text-xs font-semibold opacity-70 ${ notoFont ? noto_sc.className : saira.className }` }
        >
          { title }
        </h1>
        <h2 className={ `text-base font-medium text-nowrap ${ notoFont ? noto_sc.className : saira.className }` }>
          { content }
        </h2>
        { icon }
      </div>
    </div>
  )
}