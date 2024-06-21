'use client'

import { ReactNode } from 'react'
import { saira } from '@/app/[locale]/fonts'

export const SectionBlock = ({
  title,
  children,
}: {
  title?: string
  children: ReactNode
}) => {
  return (
    <section>
      { title && (
        <h1
          className={ `text-xl font-medium mb-4 ${ saira.className } relative before:absolute before:block before:content-[''] before:w-1 before:inset-y-1 before:rounded before:bg-primary-400` }
        >
        <span className={ 'pl-2.5' }>
          { title }
        </span>
        </h1>
      ) }
      { children }
    </section>
  )
}