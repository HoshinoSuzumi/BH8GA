'use client'

import { ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { saira } from '@/app/[locale]/fonts'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = useSession()

  if (session.status !== 'authenticated') {
    return (
      <div className={ `pt-16 w-full h-screen flex justify-center items-center ${ saira.className }` }>
        <h1 className={ 'text-xl font-semibold' }>
          {
            session.status === 'loading'
              ? 'Authenticating... Please wait.'
              : 'Access denied dude.'
          }
        </h1>
      </div>
    )
  }

  return (
    <div className={ 'pt-16 container xl:max-w-[1280px]' }>
      { children }
    </div>
  )
}