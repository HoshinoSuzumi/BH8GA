import { noto_sc, rubik } from '@/app/[locale]/fonts'
import { getTranslations } from 'next-intl/server'
import { PostItem } from '@/components/PostItem'
import { getAllPosts } from '@/app/actions/posts'
import groupBy from '@/lib/groupBy'
import dayjs from '@/app/dayjs'
import { Breads } from '@/components/Breads'
import { Footer } from '@/components/Footer'

export default async function Page({}: {}) {
  const t = await getTranslations('home.blog')
  const posts = getAllPosts()
  const groupedPosts = groupBy(posts, p => dayjs(p.date).year())

  return (
    <div className={ 'min-h-screen py-16 relative' }>
      <div className={ `container xl:max-w-[762px] p-4 md:p-0 md:pt-8 space-y-12` }>
        <div className={ `pt-6 md:pt-12 pl-2 ${ rubik.className }` }>
          <Breads breadcrumbs={ [
            { name: t('home'), href: '/' },
            { name: t('title') },
          ] }/>
          <h1 className={ 'pt-4 sm:max-w-[80%] opacity-90 font-bold text-4xl' }>
            { t('posts_archive') }
          </h1>
        </div>

        <div className={ `space-y-12` }>
          { Object.entries(groupedPosts).sort(
            ([year1], [year2]) => Number(year2) - Number(year1)
          ).map(([year, posts]) => (
            <div className={ 'space-y-4' } key={ year }>
              <h2 className={ `text-2xl font-bold mt-8 pl-2 ${ noto_sc.className }` }>{ year }</h2>
              <ul className={ '' }>
                { posts.map((post, index) => (
                  <PostItem
                    classNames={ 'fade-up-in' }
                    style={ { animationDelay: `${ index * 200 }ms` } }
                    key={ post.slug }
                    post={ post }
                  />
                )) }
              </ul>
            </div>
          )) }
          <Footer />
        </div>

      </div>
    </div>
  )
}