'use client'

import { noto_sc, pacifico, saira } from '@/app/[locale]/fonts'
import { Image } from '@nextui-org/image'
import {
  Chip, Spinner,
  useDisclosure,
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import useSWR from 'swr'
import { CardDesign } from '@/app/actions/types'
import { CardDetail } from '@/components/CardDetail'
import { card } from '@nextui-org/theme'
import Hero from '@/components/Hero'

const QSLDesign = ({
  card,
}: {
  card: CardDesign,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <div
        className={ 'w-full aspect-[14/9] cursor-zoom-in relative' }
        onClick={ onOpen }
      >
        <div className={ 'absolute top-1 right-2 z-20' }>
        <span
          className={ `text-xl text-primary-400 dark:text-primary-500 font-bold drop-shadow-lg` }
        >
          <Chip
            size={ 'sm' }
            variant="solid"
            color={ 'primary' }
            classNames={ {
              base: 'border-small border-white/50',
              content: `drop-shadow shadow-black text-white font-medium`,
            } }
          >
            #{ card.no as unknown as string || 'N/A' }
          </Chip>
        </span>
        </div>
        <Image
          src={ card.image }
          alt={ card.name || 'QSL Image' }
          className={ 'object-cover w-full h-full rounded-lg' }
          isBlurred
        />
      </div>
      <CardDetail key={ card.no } card={ card } isOpen={ isOpen } onClose={ onClose }/>
    </>
  )
}

export const Main = () => {
  const t = useTranslations()

  const {
    data: cards,
  } = useSWR<CardDesign[]>('/api/card/design', (url: string) => fetch(url).then(res => res.json()))

  return (
    <>
      <main className="min-h-screen pt-16 relative">
        <Hero
          title={
            <h1 className={ `text-4xl md:text-6xl font-bold drop-shadow-lg ${ saira.className }` }>
              <span className={ 'text-amber-400' }>QSL</span>&nbsp;
              <span className={ 'text-neutral-600 dark:text-neutral-200' }>
                  { t('gallery.title') }
                </span>
            </h1>
          }
          subtitle={
            <h2 className={ `text-sm font-bold mt-1 ${ saira.className }` }>
                <span className={ `text-neutral-400 ${ saira.className }` }>
                  { t('gallery.subtitle', { callsign: 'BH8GA' }) }
                </span>
            </h2>
          }
        />

        <div className={ `container xl:max-w-[1280px] p-4 md:p-0 md:pt-8 space-y-12 ${ saira.className }` }>
          { !cards
            ? (
              <div className={ 'flex justify-center items-center h-48' }>
                <Spinner size={ 'lg' }/>
              </div>
            )
            : (
              cards?.filter(card => card.status !== 'disabled').length === 0
                ? (
                  <div className={ 'flex justify-center items-center h-48' }>
                    <h1 className={ 'text-xl font-semibold' }>
                      { t('gallery.empty') }
                    </h1>
                  </div>
                )
                : (
                  <div className={ 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8' }>
                    { cards?.filter(card => card.status !== 'disabled').map((card: CardDesign) => (
                      <QSLDesign
                        key={ card.id }
                        card={ card }
                      />
                    )) }
                  </div>
                )
            )
          }

        </div>
      </main>
    </>
  )
}