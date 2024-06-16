'use client'

import './auth-components.scss'
import {
  Avatar,
  Button, Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import { fetchAuth, handleSignIn, handleSignOut } from '@/app/actions/auths'
import TablerShieldStar from '@/components/Icons/TablerShieldStar'
import { useEffect, useState } from 'react'
import { Session } from 'next-auth'
import { noto_sc, saira } from '@/app/[locale]/fonts'
import { useTranslations } from 'next-intl'
import { signIn } from 'next-auth/react'
import { Link } from '@/navigation'
import TablerLogin2 from '@/components/Icons/TablerLogin2'
import TablerCards from '@/components/Icons/TablerCards'
import TablerLogout from '@/components/Icons/TablerLogout'
import TablerBoxSeam from '@/components/Icons/TablerBoxSeam'
import TablerArrowsExchange from '@/components/Icons/TablerArrowsExchange'
import TablerMailFast from '@/components/Icons/TablerMailFast'

export function SignIn() {
  const t = useTranslations()

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    fetchAuth().then(session => {
      setSession(session)
    })
  }, [])

  return (
    !session
      ? (
        <form
          action={ () => signIn() }
        >
          <Button
            isIconOnly
            type="submit"
            variant={ 'light' }
            className={ '' }
          >
            <TablerLogin2 className={ 'text-xl' }/>
          </Button>
        </form>
      )
      : (
        <Dropdown placement="bottom" className={ noto_sc.className }>
          <DropdownTrigger>
            <Avatar
              isBordered
              size={ 'sm' }
              radius={ 'sm' }
              as="button"
              className="transition-transform"
              src={ session.user?.image || void 0 }
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
          >
            <DropdownItem key="profile" className="h-14 gap-2" textValue={ 'Signed in as account' }>
              <p className="font-semibold text-xs opacity-60">{ t('menu.signed_in_as') }</p>
              <p className="">{ session.user?.email }</p>
            </DropdownItem>
            <DropdownItem
              as={ Link }
              href={ '/dashboard/send-card' }
              key="send-card"
              startContent={ <TablerMailFast className={ 'text-lg' }/> }
            >
              { t('menu.send-card') }
            </DropdownItem>
            <DropdownSection title={ t('menu.management') } showDivider>
              <DropdownItem
                as={ Link }
                href={ '/dashboard/card-designs' }
                key="card-designs"
                startContent={ <TablerCards className={ 'text-lg' }/> }
              >
                { t('menu.card-designs') }
              </DropdownItem>
              {/*<DropdownItem*/}
              {/*  as={ Link }*/}
              {/*  href={ '/dashboard/card-stock' }*/}
              {/*  key="card-stock"*/}
              {/*  startContent={ <TablerBoxSeam className={ 'text-lg' }/> }*/}
              {/*>*/}
              {/*  { t('menu.card-stock') }*/}
              {/*</DropdownItem>*/}
              <DropdownItem
                as={ Link }
                href={ '/dashboard/exchanges' }
                key="exchanges"
                startContent={ <TablerArrowsExchange className={ 'text-lg' }/> }
              >
                { t('menu.exchanges') }
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title={ t('menu.account') }>
              <DropdownItem
                key="logout"
                color="danger"
                startContent={ <TablerLogout className={ 'text-lg' }/> }
                onPress={
                  async () => {
                    await handleSignOut()
                    setSession(null)
                  }
                }
              >
                { t('menu.sign_out') }
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      )
  )
}