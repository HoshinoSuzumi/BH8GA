import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import RiTranslate2 from '@/components/Icons/RiTranslate2'
import { useRouter, usePathname } from '@/navigation'
import { useMemo, useState } from 'react'

export const LanguageChanger = ({ locale }: { locale: string }) => {
  const router = useRouter()
  const pathname = usePathname()

  const changeLocale = (locale: string) => {
    router.push(pathname, { locale })
  }

  const [selectedKeys, setSelectedKeys] = useState(new Set([locale]))

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          variant={ 'light' }
        >
          <RiTranslate2 className={ 'text-xl' }/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode={ 'single' }
        onSelectionChange={ (keys) => {
          setSelectedKeys(new Set(keys as string))
          changeLocale(Array.from(new Set(keys as string))[0])
        } }
        selectedKeys={ selectedKeys }
      >
        <DropdownItem
          key="zh"
        >
          简体中文
        </DropdownItem>
        <DropdownItem
          key="en"
        >
          English
        </DropdownItem>
        <DropdownItem
          key="ja"
        >
          Japanese
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}