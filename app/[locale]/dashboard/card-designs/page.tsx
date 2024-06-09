'use client'

import { noto_sc, saira } from '@/app/[locale]/fonts'
import {
  Button, Chip,
  Input, SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow, Selection, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
} from '@nextui-org/react'
import useSWR from 'swr'
import { GaCardDesigns } from 'kysely-codegen'
import { useMemo, useState } from 'react'
import TablerPlus from '@/components/Icons/TablerPlus'
import TablerSearch from '@/components/Icons/TablerSearch'
import { ChevronDownIcon } from '@nextui-org/shared-icons'

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

  const statusOptions = [
    { name: '未启用', uid: 'disabled' },
    { name: '已启用', uid: 'enabled' },
    { name: '监修中', uid: 'paused' },
  ]

  const designStatus = (status: string) => {
    switch (status) {
      case 'disabled':
        return '未启用'
      case 'paused':
        return '监修中'
      case 'enabled':
        return '已启用'
      default:
        return '未知'
    }
  }

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'no',
    direction: 'ascending',
  })

  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<Selection>('all')

  const filteredItems = useMemo(() => {
    let filteredData = [...data || []]

    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredData = filteredData.filter((card) =>
        Array.from(statusFilter).includes(`${ card.status }`),
      )
    }

    return filteredData
  }, [data, statusFilter, statusOptions])

  const pages = Math.ceil(filteredItems.length / 10)

  const items = useMemo(() => {
    const start = (page - 1) * 10
    const end = start + 10

    return filteredItems.slice(start, end)
  }, [page, filteredItems])

  const sortedItems = useMemo(() => {
    return [...items].sort((a: GaCardDesigns, b: GaCardDesigns) => {
      const first = a[sortDescriptor.column as keyof GaCardDesigns] as string
      const second = b[sortDescriptor.column as keyof GaCardDesigns] as string
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

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
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={ <ChevronDownIcon className="text-small"/> } variant="flat">
                  状态筛选
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={ false }
                selectedKeys={ statusFilter }
                selectionMode="multiple"
                onSelectionChange={ setStatusFilter }
              >
                { statusOptions.map((status) => (
                  <DropdownItem key={ status.uid } className="capitalize">
                    { status.name }
                  </DropdownItem>
                )) }
              </DropdownMenu>
            </Dropdown>
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
  }, [data?.length, statusFilter, statusOptions])

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
                      `${ item.status }` === 'disabled' ? 'default' :
                        `${ item.status }` === 'paused' ? 'warning' :
                          `${ item.status }` === 'enabled' ? 'success' :
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