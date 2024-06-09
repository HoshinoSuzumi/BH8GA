'use client'

import { noto_sc, rubik, saira } from '@/app/[locale]/fonts'
import {
  Button, Chip,
  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import useSWR from 'swr'
import { GaCardDesigns } from 'kysely-codegen'
import { ChevronDownIcon, SearchIcon } from '@nextui-org/shared-icons'
import { useMemo } from 'react'

export default function Page() {

  const {
    data,
    isLoading,
  } = useSWR<GaCardDesigns[]>('/api/card/design', async (url: string | URL | Request) => {
    return await (await fetch(url)).json()
  })

  const designStatus = (status: number) => {
    switch (status) {
      case -1:
        return 'Draft'
      case 0:
        return 'Published'
      case 1:
        return 'Archived'
      default:
        return 'Unknown'
    }
  }

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={ <SearchIcon/> }
          />
          <div className="flex gap-3">
            asda
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total 1 users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [])

  return (
    <div className={ 'px-4' }>
      <h1 className={ `text-2xl font-semibold mt-8 mb-4 ${ saira.className }` }>Card Designs</h1>
      <div>
        <Table
          topContent={ topContent }
          topContentPlacement="outside"
          className={ noto_sc.className }
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn>No.</TableColumn>
            <TableColumn>标题</TableColumn>
            <TableColumn>描述</TableColumn>
            <TableColumn>状态</TableColumn>
            <TableColumn>创建时间</TableColumn>
          </TableHeader>
          <TableBody items={ data || [] } emptyContent={ 'No rows to display.' }>
            { item => (
              <TableRow key={ item.id }>
                <TableCell>{ `${ item.no }` }</TableCell>
                <TableCell>{ item.name }</TableCell>
                <TableCell>{ item.description }</TableCell>
                <TableCell>
                  <Chip color="warning" variant="flat" size={ 'sm' }>
                    { designStatus(item.status) }
                  </Chip>
                </TableCell>
                <TableCell>{ `${ item.create_at }` }</TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
        <pre>{ JSON.stringify(data, null, 2) }</pre>
      </div>
    </div>
  )
}