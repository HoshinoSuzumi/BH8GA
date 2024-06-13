import './Hero.scss'
import { pacifico, saira } from '@/app/[locale]/fonts'
import { ReactNode } from 'react'

export default function Hero({
  title,
  subtitle,
}: {
  title: ReactNode | string,
  subtitle?: ReactNode | string
}) {
  return (
    <div className={ 'w-full h-96 hero' }>
      <div className={ 'w-full h-full flex flex-col justify-center items-center' }>
        <div className={ 'flex flex-col items-center' }>
          { title }
          { subtitle && subtitle }
          <h2 className={ `mt-6 text-2xl relative ${ pacifico.className }` }>
            Let&apos;s get hands dirty
          </h2>
        </div>
      </div>
    </div>
  )
}