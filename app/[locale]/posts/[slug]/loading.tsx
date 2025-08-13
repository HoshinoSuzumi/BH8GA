import { Spinner } from '@nextui-org/react'
import { rubik } from '@/app/[locale]/fonts'

export default function Loading() {
  return (
    <div className="min-h-screen py-16 relative">
      <div
        className={`container xl:max-w-[762px] p-4 md:p-0 md:pt-8 space-y-12`}
      >
        <div className={`pt-6 md:pt-12 ${rubik.className}`}>
          {/* 骨架屏 */}
          <div className="space-y-4">
            <div className="flex space-x-2 text-sm text-neutral-400">
              <div className="w-8 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              <span>/</span>
              <div className="w-12 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              <span>/</span>
              <div className="w-16 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            </div>
            <div className="w-3/4 h-10 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div className="flex space-x-4 text-sm">
              <div className="w-12 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              <div className="w-16 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* 文章内容骨架屏 */}
        <div className="space-y-4">
          <div className="w-full h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          <div className="w-5/6 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          <div className="w-4/5 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          <div className="w-full h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          <div className="w-3/4 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <Spinner
            size="lg"
            label="正在加载文章内容..."
          />
        </div>
      </div>
    </div>
  )
}
