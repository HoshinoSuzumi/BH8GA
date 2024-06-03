import Image from 'next/image'
import { noto_sc, saira } from '@/app/fonts'
import TablerAlbum from '@/components/Icons/TablerAlbum'
import TablerGiftCard from '@/components/Icons/TablerGiftCard'
import TablerCards from '@/components/Icons/TablerCards'

export default function Home() {
  return (
    <main className="min-h-screen pt-16">
      {/*<div className={ 'container mx-auto p-4 md:p-0 md:pt-8 grid grid-cols-1 md:grid-cols-2 gap-4' }>*/ }
      {/*  <div className={''}>*/ }
      {/*    <h1>Bio</h1>*/ }
      {/*    <p>扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方扽发热出地方</p>*/ }
      {/*    <div className={ `w-full aspect-video rounded-lg bg-neutral-100 border ${ noto_sc.className }` }>*/ }
      {/*      <h1>QSL 卡片展</h1>*/ }
      {/*    </div>*/ }
      {/*  </div>*/ }
      {/*</div>*/ }
      <div className={ 'container max-w-[762px] p-4 md:p-0 md:pt-8' }>
        <div className={ `${ noto_sc.className }` }>
          <h1 className={ `text-xl font-medium mb-4 ${ saira.className }` }>
            About BH8GA
          </h1>
          <div>
            <div
              className={ `px-4 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 mb-4 md:float-end md:ml-6 md:mb-6 bg-gradient-to-br from-primary-600 to-purple-600 overflow-hidden relative group cursor-pointer` }
            >
              <div
                className={ 'absolute inset-0 group-hover:inset-[1px] transition-all bg-neutral-100 dark:bg-neutral-800 opacity-90 group-hover:opacity-80 backdrop-blur-md rounded-lg group-hover:rounded-[7px]' }
              ></div>
              <div className={ 'flex flex-col justify-between gap-3 pr-16 relative' }>
                <h1
                  className={ `text-primary-800 dark:text-primary-200 text-xs font-bold opacity-70 ${ saira.className }` }>
                  设计 QSL 卡面
                </h1>
                <h2 className={ `text-lg font-medium ${ saira.className }` }>
                  2 <span className={ 'opacity-70' }>张</span>
                </h2>
                <TablerCards
                  className={ 'absolute -right-1 bottom-0.5 text-primary-800 dark:text-primary-200 text-5xl opacity-25' }/>
              </div>
            </div>
            <p className={ `indent-8 text-sm leading-6 text-neutral-700 dark:text-neutral-400 ${ saira.className }` }>
              非常高兴能够与您在电波中相遇！这里是 <b className={ 'text-primary-400' }>BH8GA</b>，QTH 位于重庆 (
              <span className={ 'text-primary-400' }>OL39</span>
              )，一座美丽的山城。QSL 卡片确认是业余无线电中的一个重要环节，它不仅是通联的见证，更是我们之间友谊的象征。我非常重视每一次通联，并会认真确认和回复每一张 QSL 卡片。
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
