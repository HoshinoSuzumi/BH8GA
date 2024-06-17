import { noto_sc, rubik } from '@/app/[locale]/fonts'
import { useTranslations } from 'next-intl'
import { PostItem } from '@/components/PostItem'
import { getAllPosts } from '@/app/actions/posts'
import groupBy from '@/lib/groupBy'
import dayjs from '@/app/dayjs'
import { Breads } from '@/components/Breads'

const Translate = (key: string) => {
  'use client'
  const t = useTranslations('home.blog')
  return t(key)
}

export default function Page({}: {}) {
  const posts = getAllPosts()
  const groupedPosts = groupBy(posts, p => dayjs(p.date).year())

  return (
    <div className={ 'min-h-screen py-16 relative' }>
      <div className={ `container xl:max-w-[762px] p-4 md:p-0 md:pt-8 space-y-12` }>
        <div className={ `pt-6 md:pt-12 pl-2 ${ rubik.className }` }>
          <Breads breadcrumbs={ [
            { name: Translate('home'), href: '/' },
            { name: Translate('title') },
          ] }/>
          <h1 className={ 'pt-4 sm:max-w-[80%] opacity-90 font-bold text-4xl' }>
            { Translate('posts_archive') }
          </h1>
        </div>

        <div className={ `space-y-12` }>
          { Object.entries(groupedPosts).map(([year, posts]) => (
            <div key={ year }>
              <h2 className={ `text-2xl font-bold mt-8 pl-2 ${ noto_sc.className }` }>{ year }</h2>
              <ul className={ 'space-y-4' }>
                { posts.map(post => (
                  <PostItem key={ post.slug } post={ post }/>
                )) }
              </ul>
            </div>
          )) }
        </div>

      </div>
    </div>
  )
}