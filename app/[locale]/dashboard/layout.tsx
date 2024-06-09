import { ReactNode } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className={ 'pt-16 container xl:max-w-[1280px]' }>
      { children }
    </div>
  )
}