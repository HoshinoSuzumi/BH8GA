import {
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea, useDisclosure,
} from '@nextui-org/react'
import { Image } from '@nextui-org/image'
import { saira } from '@/app/[locale]/fonts'
import TablerCards from '@/components/Icons/TablerCards'
import TablerGift from '@/components/Icons/TablerGift'
import TablerId from '@/components/Icons/TablerId'
import TablerUser from '@/components/Icons/TablerUser'
import TablerDeviceMobile from '@/components/Icons/TablerDeviceMobile'
import TablerMailPin from '@/components/Icons/TablerMailPin'
import TablerMailFast from '@/components/Icons/TablerMailFast'
import { CardDesign } from '@/app/actions/types'
import dayjs from '@/app/dayjs'

export const CardDetail = ({
  card,
  isOpen,
  onClose,
}: {
  card: CardDesign
  isOpen: boolean
  onClose: () => void
}) => {
  const {
    isOpen: isExOpen,
    onOpen: onExOpen,
    onOpenChange: onExOpenChange,
    onClose: onExClose,
  } = useDisclosure()

  return (
    <>
      <Modal
        size={ '3xl' }
        hideCloseButton
        isOpen={ isOpen }
        onClose={ onClose }
        className={ saira.className }
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
                      src={ card.image }
                      alt={ card.name || 'Empty' }
                      className={ 'w-full aspect-[14/9]' }
                      isBlurred
                    />
                  </div>
                  <Card className={ 'px-4 py-2 md:aspect-[14/9]' }>
                    <ul className={ `grid grid-cols-2 gap-3` }>
                      <li className={ 'col-span-2' }>
                        <h2 className={ 'text-xs font-bold text-primary-500' }>
                          卡面 <span className={ `text-sm` }>#{ card.no }</span>
                        </h2>
                        <p className={ 'text-sm font-semibold' }>
                          { card.name }
                          {
                            (card.status === 'paused')
                              ? <span className={ 'text-warning-500' }> (监修中)</span>
                              : (card.status === 'disabled')
                                ? <span className={ 'text-primary-500' }> (交付中)</span>
                                : null
                          }
                        </p>
                      </li>
                      <li>
                        <h2 className={ 'text-xs font-bold text-primary-500' }>
                          启用日期
                        </h2>
                        <p className={ `text-sm font-medium` }>
                          { dayjs(card.create_at).format('YYYY-MM-DD HH:mm:ss') }
                        </p>
                      </li>
                      <li>
                        <h2 className={ 'text-xs font-bold text-primary-500' }>
                          印刷批次 / 张数
                        </h2>
                        <p className={ `text-sm font-medium` }>
                          1 / 100
                        </p>
                      </li>
                      <li className={ 'col-span-2 relative overflow-hidden' }>
                        <h2 className={ 'text-xs font-bold text-primary-500' }>
                          描述
                        </h2>
                        <p className={ 'text-sm' }>
                          { card.description }
                        </p>
                      </li>
                    </ul>
                  </Card>
                </div>
              </ModalBody>
              <ModalFooter>
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
                  color={ (() => {
                    switch (card.status) {
                      case 'enabled':
                        return 'primary'
                      case 'disabled':
                        return 'default'
                      case 'paused':
                        return 'primary'
                      default:
                        return 'default'
                    }
                  })() }
                  size={ 'md' }
                  isDisabled={ card.status !== 'enabled' }
                  onPress={ onExOpenChange }
                  startContent={ <TablerCards className={ 'text-lg' }/> }
                >
                  { (() => {
                    switch (card.status) {
                      case 'enabled':
                        return '交换卡片'
                      case 'disabled':
                        return '未启用'
                      case 'paused':
                        return '暂停换卡'
                    }
                  })() }
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
        className={ saira.className }
      >
        <ModalContent>
          { (onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>与 BH8GA 换卡</h1>
                <p
                  className={ `text-xs font-semibold flex items-center gap-0.5 text-primary-500` }>
                  <TablerGift className={ 'inline text-base' }/>
                  卡面: { card.name }
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-between gap-2">
                  <Input
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
                <Button
                  color="primary"
                  startContent={ <TablerMailFast className={ 'text-lg' }/> }
                >
                  提交
                </Button>
              </ModalFooter>
            </>
          ) }
        </ModalContent>
      </Modal>
    </>
  )
}