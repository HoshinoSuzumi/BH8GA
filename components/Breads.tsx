'use client'

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'

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