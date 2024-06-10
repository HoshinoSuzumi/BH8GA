'use client'

import '../page.scss'
import { noto_sc, pacifico, saira } from '@/app/[locale]/fonts'
import { Image } from '@nextui-org/image'
import {
  Button, Card, Checkbox, Chip, Divider,
  Input, Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader, ScrollShadow, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import TablerCards from '@/components/Icons/TablerCards'
import TablerId from '@/components/Icons/TablerId'
import TablerMailPin from '@/components/Icons/TablerMailPin'
import TablerDeviceMobile from '@/components/Icons/TablerDeviceMobile'
import TablerUser from '@/components/Icons/TablerUser'
import TablerMailFast from '@/components/Icons/TablerMailFast'
import TablerGift from '@/components/Icons/TablerGift'
import { useTranslations } from 'next-intl'
import useSWR from 'swr'
import { CardDesign } from '@/app/actions/types'

const QSLDesign = ({
  cardFace,
  onClick,
}: {
  cardFace: CardDesign,
  onClick?: () => void
}) => {
  return (
    <div
      className={ 'w-full aspect-[14/9] cursor-zoom-in relative' }
      onClick={ onClick }
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
            #{ cardFace.no as unknown as string || 'N/A' }
          </Chip>
        </span>
      </div>
      <Image
        src={ cardFace.image }
        alt={ cardFace.name || 'QSL Image' }
        className={ 'object-cover w-full h-full rounded-lg' }
        isBlurred
      />
    </div>
  )
}

export const Main = () => {
  const t = useTranslations()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isExOpen,
    onOpen: onExOpen,
    onOpenChange: onExOpenChange,
    onClose: onExClose,
  } = useDisclosure()

  const {
    data: cards,
  } = useSWR<CardDesign[]>('/api/card/design', async () => {
    const response = await fetch('/api/card/design')
    return response.json()
  })

  return (
    <>
      <main className="min-h-screen pt-16 relative">
        <div className={ 'w-full h-80 md:h-96 hero' }>
          <div className={ 'w-full h-full flex flex-col justify-center items-center' }>
            <div className={ 'flex flex-col items-center' }>
              <h1 className={ `text-4xl md:text-6xl font-bold drop-shadow-lg ${ saira.className }` }>
                <span className={ 'text-amber-400' }>QSL</span>&nbsp;
                <span className={ 'text-neutral-600 dark:text-neutral-200' }>
                  { t('gallery.title') }
                </span>
              </h1>
              <h2 className={ `text-sm font-bold mt-1 ${ saira.className }` }>
              <span className={ `text-neutral-400 ${ saira.className }` }>
                { t('gallery.subtitle', { callsign: 'BH8GA' }) }
              </span>
              </h2>
              <h2 className={ `mt-6 text-2xl relative opacity-45 ${ pacifico.className }` }>
                Let&apos;s get hands dirty
              </h2>
            </div>
          </div>
        </div>

        <div className={ `container xl:max-w-[1280px] p-4 md:p-0 md:pt-8 space-y-12 ${ saira.className }` }>
          <div className={ 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8' }>

            { cards?.map((card: CardDesign) => (
              <QSLDesign
                key={ card.id }
                cardFace={ card }
                onClick={ onOpen }
              />
            )) }

          </div>
        </div>
      </main>
      <Modal
        size={ '3xl' }
        hideCloseButton
        isOpen={ isOpen }
        onClose={ onClose }
      >
        <ModalContent>
          { onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {/*Ryo Yamada*/ }
              </ModalHeader>
              <ModalBody>
                <div className={ 'grid grid-cols-1 sm:grid-cols-2 gap-6' }>
                  <div className={ 'flex justify-center items-start' }>
                    <Image
                      src={ '/qsl/QSL_H_RyoYamada.png' }
                      alt={ 'Ryo Yamada' }
                      className={ 'w-full aspect-[14/9]' }
                      isBlurred
                    />
                  </div>
                  <Card className={ 'px-4 py-2 md:aspect-[14/9]' }>
                    <ul className={ `grid grid-cols-2 gap-3 ${ noto_sc.className }` }>
                      <li className={ 'col-span-2' }>
                        <h2 className={ 'text-xs font-bold text-primary-500' }>
                          卡面 <span className={ `text-sm ${ saira.className }` }>#2</span>
                        </h2>
                        <p className={ 'text-sm font-semibold' }>
                          Ryo Yamada
                        </p>
                      </li>
                      <li>
                        <h2 className={ 'text-xs font-bold text-primary-500' }>
                          启用日期
                        </h2>
                        <p className={ `text-sm font-medium ${ saira.className }` }>
                          2024/06/04
                        </p>
                      </li>
                      <li>
                        <h2 className={ 'text-xs font-bold text-primary-500' }>
                          印刷批次 / 张数
                        </h2>
                        <p className={ `text-sm font-medium ${ saira.className }` }>
                          1 / 100
                        </p>
                      </li>
                      <li className={ 'col-span-2 relative overflow-hidden' }>
                        <h2 className={ 'text-xs font-bold text-primary-500' }>
                          描述
                        </h2>
                        <p className={ 'text-sm' }>
                          这里写对这张卡片的描述
                        </p>
                      </li>
                    </ul>
                  </Card>
                </div>
              </ModalBody>
              <ModalFooter className={ 'justify-between md:justify-start' }>
                <Button
                  className={ 'w-full' }
                  variant="flat"
                  size={ 'md' }
                  onPress={ onClose }
                >
                  关闭
                </Button>
                <Button
                  className={ 'w-full' }
                  color="primary"
                  size={ 'md' }
                  onPress={ onExOpenChange }
                  startContent={ <TablerCards className={ 'text-lg' }/> }
                >
                  换卡请求
                </Button>
              </ModalFooter>
            </>
          ) }
        </ModalContent>
      </Modal>
      <Modal
        size={ 'lg' }
        isOpen={ isExOpen }
        backdrop={ 'blur' }
        onOpenChange={ onExOpenChange }
      >
        <ModalContent>
          { (onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>与 BH8GA 换卡</h1>
                <p
                  className={ `text-xs font-semibold flex items-center gap-0.5 text-primary-500 ${ noto_sc.className }` }>
                  <TablerGift className={ 'inline text-base' }/>
                  卡面: Ryo Yamada
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-between gap-2">
                  <Input
                    autoFocus
                    endContent={
                      <TablerId className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    label="呼号"
                  />
                  <Input
                    endContent={
                      <TablerUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    label="收件人"
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <Input
                    endContent={
                      <TablerDeviceMobile className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    label="收件电话"
                    type={ 'tel' }
                  />
                  <Input
                    endContent={
                      <TablerMailPin className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    label="邮编"
                  />
                </div>
                <Textarea
                  label="收件地址"
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={ onClose }>
                  取消
                </Button>
                <Tooltip color={ 'foreground' } content={ '暂未开放此处换卡' }>
                  <Button
                    color="primary"
                    startContent={ <TablerMailFast className={ 'text-lg' }/> }
                  >
                    提交
                  </Button>
                </Tooltip>
              </ModalFooter>
            </>
          ) }
        </ModalContent>
      </Modal>
    </>
  )
}