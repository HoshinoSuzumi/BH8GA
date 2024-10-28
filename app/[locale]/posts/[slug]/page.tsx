import './page.scss'
import { getPostBySlug } from '@/app/actions/posts'
import md2html from '@/lib/md2html'
import { rubik } from '@/app/[locale]/fonts'
import dayjs from '@/app/dayjs'
import { estimateReadingTime } from '@/lib/estimateReadingTime'
import { useTranslations } from 'next-intl'
import { Metadata } from 'next'
import { Breads } from '@/components/Breads'

const Datetime = ({
  date,
}: {
  date: string,
}) => {
  'use client'

  return (
    <span title={ dayjs(date).locale('en').format('dddd, MMMM D, YYYY') }>
      { dayjs(date).locale('en').format('MMM D') }
    </span>
  )
}

const Translate = (key: string) => {
  'use client'

  const t = useTranslations('home.blog')
  return t(key)
}

const BreadCrumbs = ({ title }: { title: string }) => {
  'use client'
  return (
    <Breads
      breadcrumbs={ [
        { name: Translate('home'), href: '/' },
        { name: Translate('title'), href: '/posts' },
        { name: Translate('this_article') },
      ] }
    />
  )
}

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return (
      <div className={
        'min-h-screen flex items-center justify-center'
      }>
        <h1 className={ 'text-2xl font-bold' }>
          { Translate('post_not_found') }
        </h1>
      </div>
    )
  }

  const content = await md2html(post.content)
  const readingTime = estimateReadingTime(post.content)

  return (
    <div className={ 'min-h-screen py-16 relative' }>
      <div className={ `container xl:max-w-[762px] p-4 md:p-0 md:pt-8 space-y-12` }>
        <div className={ `pt-6 md:pt-12 ${ rubik.className }` }>
          <BreadCrumbs title={ post.title }/>
          <h1 className={ 'pt-4 sm:max-w-[80%] opacity-90 font-bold text-4xl' }>{ post.title }</h1>
          <p className={ 'mt-2 opacity-40' }>
            <Datetime date={ post.date }/>
            <span className={ 'px-2' }>·</span>
            <span>
              { readingTime }min
            </span>
            { post.tags && (
              <span>
                <span className={ 'px-2' }>·</span>
                <span className={ 'inline-flex gap-1' }>
                  { post.tags.map((tag) => (
                    <span key={ tag } className={ 'font-medium' }>
                    #{ tag }
                  </span>
                  )) }
                </span>
              </span>
            ) }
          </p>
        </div>
        <article
          className={ `post-prose text-justify ${ rubik.className }` }
          dangerouslySetInnerHTML={ { __html: content } }
        />
      </div>
    </div>
  )
}

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: '文章不存在 | BH8GA\'s blog',
    }
  }

  const content = await md2html(post.content)

  const title = `${ post?.title || '文章不存在' } | BH8GA's blog`

  return {
    title,
    metadataBase: new URL('https://bh8.ga'),
    openGraph: {
      title,
      description: post?.excerpt || content.replace(/<[^>]*>/g, '').slice(0, 200),
      type: 'article',
      publishedTime: post?.date,
      modifiedTime: post?.date,
      tags: post?.tags,
    },
    other: {
      'fediverse:creator': '@HoshinoSuzumi@uniiem.com',
    },
  }
}
