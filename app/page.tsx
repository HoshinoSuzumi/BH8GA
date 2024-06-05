import './page.scss'
import { noto_sc, pacifico, saira } from '@/app/fonts'
import TablerCards from '@/components/Icons/TablerCards'
import { ReactNode } from 'react'
import TablerBrandBilibili from '@/components/Icons/TablerBrandBilibili'
import TablerBrandGithub from '@/components/Icons/TablerBrandGithub'
import TablerBrandTelegram from '@/components/Icons/TablerBrandTelegram'
import TablerBrandSteam from '@/components/Icons/TablerBrandSteam'
import { ContactCard } from '@/app/ContactCard'
import Link from 'next/link'

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
          className={ `text-primary-800 text-xs font-bold opacity-70 ${ noto_sc.className }` }>
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

export default function Home() {
  return (
    <main className="min-h-screen pt-16 relative">
      <div className={ 'w-full h-96 hero' }>
        <div className={ 'w-full h-full flex flex-col justify-center items-center' }>
          <div className={ 'flex flex-col items-center' }>
            <h1 className={ `text-6xl font-bold drop-shadow-lg ${ saira.className }` }>
              <span className={ 'text-neutral-600 dark:text-neutral-200' }>BH8</span>
              <span className={ 'text-amber-400' }>GA</span>
            </h1>
            <h2 className={ `text-sm font-bold ${ saira.className }` }>
              <span className={ 'text-neutral-400' }>
                ITU 43 | CQ 24 | OL39
              </span>
            </h2>
            <h2 className={ `mt-6 text-2xl relative ${ pacifico.className }` }>
              Let&apos;s get hands dirty
            </h2>
          </div>
        </div>
      </div>
      <div className={ `container max-w-[762px] p-4 md:p-0 md:pt-8 space-y-12 ${ noto_sc.className }` }>
        <section>
          <h1
            className={ `text-xl font-medium mb-4 ${ saira.className } relative before:absolute before:block before:content-[''] before:w-1 before:inset-y-1 before:rounded before:bg-primary-400` }
          >
            <span className={ 'pl-2.5' }>
              About <ruby>BH8GA<rt className={ 'leading-none' }>Radio Callsign</rt></ruby>
            </span>
          </h1>
          <article>
            <FloatCard
              href={ '/gallery' }
              className={ 'mb-4 md:float-end md:ml-6 md:mb-2' }
              label={ '浏览 QSL 卡面' }
              content={
                <>
                  2 <span className={ `opacity-70 ${ noto_sc.className }` }>张</span>
                </>
              }
              icon={
                <TablerCards
                  className={ 'absolute -right-1 bottom-0.5 text-primary-800 text-5xl opacity-25' }
                />
              }
            />
            <p className={ `indent-6 text-sm leading-6 text-neutral-700 dark:text-neutral-400 ${ noto_sc.className }` }>
              非常高兴能够与您在电波中相遇！这里是&nbsp;
              <b className={ `text-primary-400 ${ saira.className }` }>BH8GA</b>，QTH 位于重庆 (
              <span className={ 'text-primary-400' }>OL39</span>
              )，一座美丽的山城。我是一名独立前端开发者（在校），开发了一些有趣的东西，目前在维护&nbsp;
              <a className={ 'font-bold text-primary-400' } href="https://ham-dev.c5r.app/">HAM set</a>、
              <a className={ 'font-bold text-primary-400' } href="https://ctfever.uniiem.com/">CTFever</a>，
              这两个项目都是在线工具类网站，前者是一个业余无线电工具箱，包含字母解释法速查、考试题库、卫星数据库和梅登黑德网格定位等功能；后者是为网络安全夺旗赛开发的一站式工具箱。
              我贯彻 <span className={ `${ pacifico.className }` }>get hands dirty</span>
              &nbsp;的思想，热爱将脑子里的灵光一现变为现实。当你想做一件事情的时候，那就立刻放手去做，不要受制于各种“先决条件”：当你想要阅读一本书，就立刻打开书开始阅读，不要泡好一杯咖啡、洗好一盘水果再开始；
              当你想到一个 idea，就立刻打开电脑尝试实现，不要先去学习各种技术、先去了解各种知识再开始。
              <b>永远不要等到你的热情开始消退之时再开始行动。</b>
            </p>
          </article>
        </section>
        <section>
          <h1
            className={ `text-xl font-medium mb-4 ${ saira.className } relative before:absolute before:block before:content-[''] before:w-1 before:inset-y-1 before:rounded before:bg-primary-400` }
          >
            <span className={ 'pl-2.5' }>
              <ruby>Find Me<rt>On the Internet</rt></ruby>
            </span>
          </h1>
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
              title={ '哔哩哔哩' }
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
        </section>
      </div>
    </main>
  )
}
