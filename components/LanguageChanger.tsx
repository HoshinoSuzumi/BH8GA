import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import RiTranslate2 from '@/components/Icons/RiTranslate2'
import { useRouter, usePathname } from '@/navigation'

export const LanguageChanger = ({ locale }: { locale: string }) => {
  const router = useRouter()
  const pathname = usePathname()

  const changeLocale = (locale: string) => {
    router.push(pathname, { locale })
  }

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
        selectedKeys={ [locale] }
      >
        <DropdownItem
          className={ 'active' }
          onClick={
            () => changeLocale('zh')
          }
          key="zh"
        >
          简体中文
        </DropdownItem>
        <DropdownItem
          onClick={
            () => changeLocale('en')
          }
          key="en"
        >
          English
        </DropdownItem>
        <DropdownItem
          onClick={
            () => changeLocale('ja')
          }
          key="ja"
        >
          Japanese
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}