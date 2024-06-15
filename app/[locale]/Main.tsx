'use client'

import { noto_sc, pacifico, rubik, saira } from '@/app/[locale]/fonts'
import TablerCards from '@/components/Icons/TablerCards'
import { ContactCard } from '@/app/[locale]/ContactCard'
import TablerBrandGithub from '@/components/Icons/TablerBrandGithub'
import TablerBrandBilibili from '@/components/Icons/TablerBrandBilibili'
import TablerBrandSteam from '@/components/Icons/TablerBrandSteam'
import TablerBrandTelegram from '@/components/Icons/TablerBrandTelegram'
import { Avatar, Button, Card, Chip, Tooltip } from '@nextui-org/react'
import { CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Link } from '@/navigation'
import { Image } from '@nextui-org/image'
import TablerExternalLink from '@/components/Icons/TablerExternalLink'
import dayjs from '@/app/dayjs'
import { useTranslations } from 'next-intl'
import { CardDesign } from '@/app/actions/types'
import { fetchCardDesigns } from '@/app/actions/card'
import { ReactNode, useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import { Post } from '@/app/actions/posts'
import { estimateReadingTime } from '@/lib/estimateReadingTime'
import TablerBrain from '@/components/Icons/TablerBrain'

const FloatCard = ({
  label,
  content,
  icon,
  className,
  href,
}: {
  label: string
  content: ReactNode
  icon?: ReactNode
  className?: string
  href: string
}) => {
  return (
    <Link
      href={ href }
      className={ `block px-4 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 bg-gradient-to-br from-primary-600 to-purple-600 overflow-hidden relative group cursor-pointer ${ className }` }
    >
      <div
        className={ 'absolute -inset-0.5 group-hover:inset-[1px] transition-all bg-neutral-100 dark:bg-neutral-800 opacity-80 group-hover:opacity-75 backdrop-blur-md rounded-lg group-hover:rounded-[7px]' }
      ></div>
      <div className={ 'flex flex-col justify-between gap-3 pr-16 relative' }>
        <h1
          className={ `text-primary-800 text-xs font-bold opacity-70 ${ saira.className }` }>
          { label }
        </h1>
        <h2 className={ `text-lg font-medium ${ saira.className }` }>
          { content }
        </h2>
        { icon }
      </div>
    </Link>
  )
}

const SectionBlock = ({
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

const PostItem = ({
  post,
  isExternal = false,
}: {
  post: Post,
  isExternal?: boolean
}) => {
  const t = useTranslations('home.blog')
  const [readingTime, setReadingTime] = useState(0)
  useEffect(() => {
    setReadingTime(estimateReadingTime(post.content))
  }, [post.content])

  return (
    <li
      className={ 'w-full opacity-60 p-2 rounded hover:opacity-100 transition-opacity duration-300 relative' }
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
            <span className={ 'text-sm text-neutral-400' }>
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

export default function Main({
  posts,
  params: { locale },
}: {
  posts: Post[],
  params: { locale: string }
}) {
  const t = useTranslations('home')
  const [cards, setCards] = useState<CardDesign[]>()

  useEffect(() => {
    fetchCardDesigns().then(setCards)
  }, [])

  return (
    <main className="min-h-screen py-16 relative">
      <Hero
        title={
          <h1 className={ `text-6xl font-bold drop-shadow-lg ${ saira.className }` }>
            <span className={ 'text-neutral-600 dark:text-neutral-200' }>BH8</span>
            <span className={ 'text-amber-400' }>GA</span>
          </h1>
        }
        subtitle={
          <h2 className={ `text-sm font-bold mt-1 ${ saira.className }` }>
              <span className={ 'text-neutral-400' }>
                ITU 43 | CQ 24 | OL39
              </span>
          </h2>
        }
      />
      <div className={ `container max-w-[762px] p-4 md:p-0 md:pt-8 space-y-12 ${ noto_sc.className }` }>

        <SectionBlock title={ t('about', { callsign: 'BH8GA' }) }>
          <article>
            <FloatCard
              href={ '/gallery' }
              className={ 'mb-4 md:float-end md:ml-6 md:mb-2' }
              label={ t('my_qsl_faces') }
              content={
                <>{ t('my_qsl_count', { count: cards?.filter(card => card.status !== 'disabled').length || '-' }) }</>
              }
              icon={
                <TablerCards
                  className={ 'absolute -right-1 bottom-0.5 text-primary-800 text-5xl opacity-25' }
                />
              }
            />
            <p
              className={ `indent-6 text-sm leading-6 text-neutral-700 dark:text-neutral-400 text-justify ${ saira.className }` }
            >
              非常高兴能够与您在电波中相遇！这里是&nbsp;
              <b className={ `text-primary-400` }>BH8GA</b>，QTH 位于重庆 (
              <span className={ 'text-primary-400' }>OL39</span>
              )，一座美丽的山城。我是一名独立前端开发者（在校），开发了一些有趣的东西，喜欢<b>业余无线电</b>通信。目前在维护&nbsp;
              <a className={ 'font-bold text-primary-400' } href="https://ham-dev.c5r.app/">HAM set</a>、
              <a className={ 'font-bold text-primary-400' } href="https://ctfever.uniiem.com/">CTFever</a>，
              这两个项目都是在线工具类网站，前者是一个业余无线电工具箱，包含字母解释法速查、考试题库、卫星数据库和梅登黑德网格定位等功能；后者是为网络安全夺旗赛开发的一站式工具箱。
              我贯彻 <span className={ `${ pacifico.className }` }>get hands dirty</span>
              &nbsp;的思想，热爱将脑子里的灵光一现变为现实。当你想做一件事情的时候，那就立刻放手去做，不要受制于各种“先决条件”：当你想要阅读一本书，就立刻打开书开始阅读，不要泡好一杯咖啡、洗好一盘水果再开始；
              当你想到一个 idea，就立刻打开电脑尝试实现，不要先去学习各种技术、先去了解各种知识再开始。
              <b>永远不要等到你的热情开始消退之时再开始行动。</b>
              { locale !== 'zh'
                ? <span className={ 'font-bold opacity-50' }>(Only available in Chinese)</span>
                : null
              }
            </p>
          </article>
        </SectionBlock>

        <SectionBlock title={ t('find_me') }>
          <div className={ 'grid grid-cols-2 md:grid-cols-4 gap-4' }>
            <ContactCard
              title={ 'GitHub' }
              content={ 'HoshinoSuzumi' }
              href={ 'https://github.com/HoshinoSuzumi' }
              icon={
                <TablerBrandGithub
                  className={ 'absolute -right-1 bottom-0 text-primary-800 text-5xl opacity-25' }
                />
              }
            />
            <ContactCard
              notoFont
              title={ t('bilibili') }
              content={ '星野鈴美' }
              href={ 'https://space.bilibili.com/158985588' }
              icon={
                <TablerBrandBilibili
                  className={ 'absolute -right-1 bottom-0 text-primary-800 text-5xl opacity-25' }
                />
              }
            />
            <ContactCard
              title={ 'Steam' }
              content={ 'Hoshino_suzumi' }
              href={ 'https://steamcommunity.com/id/Hoshino_suzumi/' }
              icon={
                <TablerBrandSteam
                  className={ 'absolute -right-1 bottom-0 text-primary-800 text-5xl opacity-25' }
                />
              }
            />
            <ContactCard
              title={ 'Telegram' }
              content={ '@Hoshino_suzumi' }
              href={ 'https://t.me/Hoshino_suzumi' }
              icon={
                <TablerBrandTelegram
                  className={ 'absolute -right-1 bottom-0 text-primary-800 text-5xl opacity-25' }
                />
              }
            />
          </div>
        </SectionBlock>

        <SectionBlock title={ t('works') }>
          <div className={ 'grid grid-cols-12 grid-rows-2 gap-4' }>

            <Card
              className={ `col-span-12 sm:col-span-5 ${ saira.className }` }
            >
              <CardHeader className="justify-between">
                <div className="flex gap-4">
                  <Avatar isBordered radius="full" size="md" src="/avatar.jpg"/>
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">星野鈴美</h4>
                    <h5 className="text-small tracking-tight text-default-400 leading-none">HoshinoSuzumi</h5>
                  </div>
                </div>
                <Button
                  startContent={ <TablerBrandGithub className={ 'text-base opacity-60' }/> }
                  className={ 'bg-transparent text-foreground border-default-200' }
                  color="primary"
                  radius="full"
                  size="sm"
                  variant={ 'bordered' }
                  as={ Link }
                  href={ 'https://github.com/HoshinoSuzumi' }
                  target={ '_blank' }
                >
                  Follow
                </Button>
              </CardHeader>
              <CardBody className="px-3 py-0 pb-2 text-xs text-default-400 text-justify overflow-hidden">
                <p>{ t('proj.me') }</p>
              </CardBody>
            </Card>

            <Card isFooterBlurred className={ `w-full h-full col-span-12 sm:col-span-7 ${ saira.className }` }>
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">{ t('proj.ctfever.title1') }</p>
                <h4 className="text-white/90 font-medium text-xl">{ t('proj.ctfever.title2') }</h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="CTFever app background"
                className="z-0 w-full aspect-[16/9] sm:aspect-[16/7] object-cover"
                src="/works/ctfever_bg.jpg"
              />
              <CardFooter
                className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <Image
                    alt="CTFever app icon"
                    className="w-10 h-10"
                    src="/works/ctfever_icon.png"
                  />
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/80 font-medium">{ t('proj.ctfever.name') }</p>
                    <p className="text-tiny text-white/60">{ t('proj.ctfever.desc') }</p>
                  </div>
                </div>
                <Button
                  color={ 'primary' }
                  className={ `${ noto_sc.className }` }
                  radius="sm"
                  size="sm"
                  as={ Link }
                  href={ 'https://c5r.app/' }
                  target={ '_blank' }
                >
                  { t('proj.try_it') }
                </Button>
              </CardFooter>
            </Card>

            <Card isFooterBlurred className={ `w-full h-full col-span-12 sm:col-span-7 ${ saira.className }` }>
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">{ t('proj.hamset.title1') }</p>
                <h4 className="text-white/90 font-medium text-xl">{ t('proj.hamset.title2') }</h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="CTFever app background"
                className="z-0 w-full aspect-[16/9] sm:aspect-[16/7] object-cover"
                src="/works/hamset_bg.jpg"
              />
              <CardFooter
                className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/80 font-medium">{ t('proj.hamset.name') }</p>
                    <p className="text-tiny text-white/60">{ t('proj.hamset.desc') }</p>
                  </div>
                </div>
                <Button
                  color={ 'primary' }
                  className={ `${ noto_sc.className }` }
                  radius="sm"
                  size="sm"
                  as={ Link }
                  href={ 'https://ham-dev.c5r.app/' }
                  target={ '_blank' }
                >
                  { t('proj.try_it') }
                </Button>
              </CardFooter>
            </Card>

          </div>
        </SectionBlock>

        <SectionBlock title={ t('blog.title') }>
          <ul className={ `w-full space-y-1 ${ noto_sc.className }` }>
            { posts.map((post, index) => <PostItem post={ post } key={ index } isExternal={ post.external }/>) }
          </ul>
        </SectionBlock>

        <SectionBlock>
          <footer className={ `pl-2 ${ rubik.className }` }>
            <span className={ 'text-sm opacity-50' }>
              { dayjs().format('YYYY') } Present &copy; Hoshino Suzumi
            </span>
          </footer>
        </SectionBlock>

      </div>
    </main>
  )
}