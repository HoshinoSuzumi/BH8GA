'use client'

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { Link } from '@/navigation'

export const Breads = ({
  breadcrumbs,
}: {
  breadcrumbs: {
    name: string
    href?: string
  }[]
}) => {
  return (
    <Breadcrumbs>
      { breadcrumbs.map((breadcrumb, index) => (
        breadcrumb.href
          ? (
            <BreadcrumbItem
              key={ index }
              as={ Link }
              href={ breadcrumb.href }
            >
              { breadcrumb.name }
            </BreadcrumbItem>
          )
          : (
            <BreadcrumbItem
              key={ index }
            >
              { breadcrumb.name }
            </BreadcrumbItem>
          )
      )) }
    </Breadcrumbs>
  )
}