import { Spinner } from '@nextui-org/react'

export default function Loading() {
  return (
    <div className={ 'w-full h-screen flex flex-col gap-4 justify-center items-center bg-white dark:bg-neutral-900' }>
      <Spinner size={ 'lg' } label={ 'Loading' }/>
    </div>
  )
}