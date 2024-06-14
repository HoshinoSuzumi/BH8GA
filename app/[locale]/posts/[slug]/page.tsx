import './page.scss'
import { getAllPosts, getPostBySlug } from '@/app/actions/posts'
import md2html from '@/lib/md2html'
import { rubik } from '@/app/[locale]/fonts'
import dayjs from '@/app/dayjs'
import { estimateReadingTime } from '@/lib/estimateReadingTime'
import { useTranslations } from 'next-intl'
import { Metadata } from 'next'

const Datetime = ({
  date,
  isFull = false,
}: {
  date: string,
  isFull?: boolean
}) => {
  'use client'

  return (
    <span title={ dayjs(date).locale('en').format('dddd, MMMM D, YYYY') }>
      { dayjs(date).locale('en').format('MMM D') }
    </span>
  )
}

const Mood = () => {
  'use client'

  const t = useTranslations('home.blog')
  return (
    <span>
      <span className={ 'px-2' }>·</span>
      <span className={ 'text-primary-500' }>{ t('mood') }</span>
    </span>
  )
}

const Translate = ({
  translateKey,
}: {
  translateKey: string
}) => {
  'use client'

  const t = useTranslations('home.blog')
  return t(translateKey)
}

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return (
      <div className={
        'min-h-screen flex items-center justify-center'
      }>
        <h1 className={ 'text-2xl font-bold' }>
          <Translate translateKey={ 'post_not_found' }/>
        </h1>
      </div>
    )
  }

  const content = await md2html(post.content)
  const readingTime = estimateReadingTime(content)

  return (
    <div className={ 'min-h-screen py-16 relative' }>
      <div className={ `container xl:max-w-[762px] p-4 md:p-0 md:pt-8 space-y-12` }>
        <div className={ `pt-6 md:pt-12 ${ rubik.className }` }>
          <h1 className={ 'sm:max-w-[80%] opacity-90 font-bold text-4xl' }>{ post.title }</h1>
          <p className={ 'mt-2 opacity-40' }>
            <Datetime date={ post.date }/>
            <span className={ 'px-2' }>·</span>
            <span>
              { readingTime }min
            </span>
            { post.tag === 'mood' && (
              <Mood/>
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

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug)

  const title = `${ post?.title || '文章不存在' } | BH8GA's blog`

  return {
    title,
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
