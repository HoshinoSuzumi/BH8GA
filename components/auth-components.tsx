'use client'

import './auth-components.scss'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { fetchAuth, handleSignIn, handleSignOut } from '@/app/actions/auths'
import TablerShieldStar from '@/components/Icons/TablerShieldStar'
import { useEffect, useState } from 'react'
import { Session } from 'next-auth'
import { noto_sc, saira } from '@/app/[locale]/fonts'
import { useTranslations } from 'next-intl'

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
          action={ handleSignIn }
        >
          <Button
            isIconOnly
            type="submit"
            variant={ 'light' }
            className={ 'auto-hidden' }
          >
            <TablerShieldStar className={ 'text-xl' }/>
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
              <p className="font-semibold text-xs opacity-60">{ t('avatar.signed_in_as') }</p>
              <p className="">{ session.user?.email }</p>
            </DropdownItem>
            <DropdownItem
              key="dashboard"
            >
              {t('avatar.dashboard')}
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onPress={
                async () => {
                  await handleSignOut()
                  setSession(null)
                }
              }
            >
              {t('avatar.sign_out')}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )
  )
}