'use client'

import { Post } from '@/app/actions/posts'
import { useTranslations } from 'next-intl'
import { CSSProperties, useEffect, useState } from 'react'
import { estimateReadingTime } from '@/lib/estimateReadingTime'
import { Tooltip } from '@nextui-org/react'
import TablerBrain from '@/components/Icons/TablerBrain'
import { Link } from '@/navigation'
import TablerExternalLink from '@/components/Icons/TablerExternalLink'
import dayjs from '@/app/dayjs'

export const PostItem = ({
  post,
  isExternal = false,
  classNames,
  style,
}: {
  post: Post,
  isExternal?: boolean
  classNames?: string
  style?: CSSProperties
}) => {
  const t = useTranslations('home.blog')
  const [readingTime, setReadingTime] = useState(0)
  useEffect(() => {
    setReadingTime(estimateReadingTime(post.content))
  }, [post.content])

  return (
    <li
      style={ style }
      className={ `w-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 px-2 py-1 rounded transition duration-300 relative ${ classNames }` }
    >
      { post.tag === 'mood' && (
        <div className={ 'absolute -left-2.5 h-full -mt-[7px] hidden sm:flex items-center' }>
          <Tooltip content={ t('mood') } placement={ 'left' } size={ 'sm' }>
            <div>
              <TablerBrain className={ 'opacity-50' }/>
            </div>
          </Tooltip>
        </div>
      ) }
      <Link
        href={ `/posts/${ post.slug }` }
        className={ `w-full flex items-start gap-1` }
      >
        <div>
          <h1 className={ 'flex flex-col sm:flex-row sm:items-center sm:gap-2' }>
            <span className={ 'flex items-center gap-0.5' }>
              { post.title }
              { isExternal && (
                <TablerExternalLink className={ 'text-lg opacity-60' }/>
              ) }
            </span>
            <span className={ 'text-sm text-neutral-300 dark:text-neutral-500' }>
              { dayjs(post.date).tz('Asia/Shanghai').locale('en').format('MMM D') }·{ readingTime }分钟
              { post.tag === 'mood' && <span className={ 'text-primary-400 inline sm:hidden' }>·{ t('mood') }</span> }
            </span>
          </h1>
          { post.excerpt && (
            <h2 className={ 'leading-none opacity-60 text-xs' }>
              { post.excerpt }
            </h2>
          ) }
        </div>
      </Link>
    </li>
  )
}