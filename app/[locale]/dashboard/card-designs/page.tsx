'use client'

import { noto_sc, rubik, saira } from '@/app/[locale]/fonts'
import {
  Button, Chip,
  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Input, SortDescriptor,
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
import { useMemo, useState } from 'react'
import { Infer } from 'next/dist/compiled/superstruct'
import TablerAlbum from '@/components/Icons/TablerAlbum'
import TablerPlus from '@/components/Icons/TablerPlus'
import TablerSearch from '@/components/Icons/TablerSearch'

export default function Page() {

  const {
    data,
    isLoading,
  } = useSWR<GaCardDesigns[]>('/api/card/design', async (url: string | URL | Request) => {
    return await (await fetch(url)).json()
  })

  const headerColumns = useMemo(() => {
    return [
      { key: 'no', title: 'No.', sortable: true },
      { key: 'name', title: '标题', sortable: true },
      { key: 'description', title: '描述' },
      { key: 'status', title: '状态', sortable: true },
      { key: 'create_at', title: '创建时间', sortable: true },
    ]
  }, [])

  const designStatus = (status: string) => {
    switch (status) {
      case '-1':
        return '未启用'
      case '0':
        return '监修中'
      case '1':
        return '已启用'
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
            placeholder="搜索卡面"
            startContent={ <TablerSearch className={ 'text-xl' }/> }
          />
          <div className="flex gap-3">
            <Button color="primary" endContent={ <TablerPlus className={ 'text-xl' }/> }>
              新建卡面
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">共 { data?.length || '-' } 个卡面</span>
          <label className="flex items-center text-default-400 text-small">
            每页展示
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
  }, [data])

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'no',
    direction: 'ascending',
  })

  const sortedItems = useMemo(() => {
    return [...data || []].sort((a: GaCardDesigns, b: GaCardDesigns) => {
      const first = a[sortDescriptor.column as keyof GaCardDesigns] as string
      const second = b[sortDescriptor.column as keyof GaCardDesigns] as string
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, data])

  return (
    <div className={ 'px-4' }>
      <h1 className={ `text-2xl font-semibold mt-8 mb-4 ${ saira.className }` }>Card Designs</h1>
      <div>
        <Table
          topContent={ topContent }
          topContentPlacement="outside"
          sortDescriptor={ sortDescriptor }
          onSortChange={ setSortDescriptor }
          className={ noto_sc.className }
          aria-label="Card Designs"
        >
          <TableHeader columns={ headerColumns }>
            { (column) => (
              <TableColumn
                key={ column.key }
                align={ column.key === 'actions' ? 'center' : 'start' }
                allowsSorting={ column.sortable }
              >
                { column.title }
              </TableColumn>
            ) }
          </TableHeader>
          <TableBody
            items={ sortedItems }
            isLoading={ isLoading }
            loadingContent={ <Spinner/> }
            emptyContent={ 'No rows to display.' }
          >
            { item => (
              <TableRow key={ item.id }>
                <TableCell>{ `${ item.no }` }</TableCell>
                <TableCell>{ item.name }</TableCell>
                <TableCell>{ item.description }</TableCell>
                <TableCell>
                  <Chip
                    color={
                      `${ item.status }` === '-1' ? 'warning' :
                        `${ item.status }` === '0' ? 'primary' :
                          `${ item.status }` === '1' ? 'success' :
                            undefined
                    }
                    variant="flat"
                    size={ 'sm' }
                  >
                    { designStatus(`${ item.status }`) }
                  </Chip>
                </TableCell>
                <TableCell>{ `${ item.create_at }` }</TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}