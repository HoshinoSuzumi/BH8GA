import { QSLFace } from '@/types'
import {
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea, Tooltip, useDisclosure,
} from '@nextui-org/react'
import { Image } from '@nextui-org/image'
import { noto_sc, saira } from '@/app/[locale]/fonts'
import TablerCards from '@/components/Icons/TablerCards'
import TablerGift from '@/components/Icons/TablerGift'
import TablerId from '@/components/Icons/TablerId'
import TablerUser from '@/components/Icons/TablerUser'
import TablerDeviceMobile from '@/components/Icons/TablerDeviceMobile'
import TablerMailPin from '@/components/Icons/TablerMailPin'
import TablerMailFast from '@/components/Icons/TablerMailFast'

export const CardDetail = ({
  card,
}: {
  card: QSLFace
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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