'use client'

import { noto_sc, saira } from '@/app/[locale]/fonts'
import {
  Button,
  Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, SelectedItems, Selection, SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow, Textarea, useDisclosure,
} from '@nextui-org/react'
import TablerPlus from '@/components/Icons/TablerPlus'
import { ChangeEvent, FormEvent, Key, useCallback, useMemo, useState } from 'react'
import TablerSearch from '@/components/Icons/TablerSearch'
import { ChevronDownIcon } from '@nextui-org/shared-icons'
import { CardDesign, NewCardDesign } from '@/app/actions/types'
import useSWR from 'swr'
import dayjs from '@/app/dayjs'
import TablerDotsVertical from '@/components/Icons/TablerDotsVertical'
import { Image } from '@nextui-org/image'
import TablerPlay from '@/components/Icons/TablerPlay'
import TablerPause from '@/components/Icons/TablerPause'
import TablerReload from '@/components/Icons/TablerReload'
import TablerEdit from '@/components/Icons/TablerEdit'
import TablerTrash from '@/components/Icons/TablerTrash'
import { uuidv4 } from '@uniiem/uuid'
import TablerPlayerStop from '@/components/Icons/TablerPlayerStop'

export default function Main() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [formData, setFormData] = useState({} as NewCardDesign)

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const {
    data,
    isLoading,
    mutate,
  } = useSWR<CardDesign[]>('card-designs', async () => {
    const res = await fetch('/api/card/design')
    return await res.json()
  })

  const headerColumns = useMemo(() => {
    return [
      { key: 'image', title: '' },
      { key: 'no', title: 'No.', sortable: true },
      { key: 'name', title: '标题', sortable: true },
      { key: 'status', title: '状态', sortable: true },
      { key: 'create_at', title: '创建时间', sortable: true },
      { key: 'actions', title: '操作' },
    ]
  }, [])

  const statusOptions = useMemo(() => {
    return [
      { name: '未启用', uid: 'disabled' },
      { name: '已启用', uid: 'enabled' },
      { name: '监修中', uid: 'paused' },
    ]
  }, [])

  const statusColorMap: Record<string, ChipProps['color']> = {
    enabled: 'success',
    disabled: 'default',
    paused: 'warning',
  }

  const statusTipMap: Record<string, string> = {
    enabled: '已启用',
    disabled: '未启用',
    paused: '监修中',
  }

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'no',
    direction: 'ascending',
  })

  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [statusFilter, setStatusFilter] = useState<Selection>('all')

  const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const filteredItems = useMemo(() => {
    let filteredData = [...data || []]

    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredData = filteredData.filter((card) =>
        Array.from(statusFilter).includes(`${ card.status }`),
      )
    }

    return filteredData
  }, [data, statusFilter, statusOptions])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, rowsPerPage, filteredItems])

  const sortedItems = useMemo(() => {
    return [...items].sort((a: CardDesign, b: CardDesign) => {
      const first = a[sortDescriptor.column as keyof CardDesign] as number
      const second = b[sortDescriptor.column as keyof CardDesign] as number
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
            <Button
              color="primary"
              endContent={ <TablerPlus className={ 'text-xl' }/> }
              onClick={ onOpen }
            >
              新建卡面
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">共 { data?.length || '-' } 个卡面</span>
          <label className="flex items-center text-default-400 text-small">
            每页展示
            <select
              onChange={ onRowsPerPageChange }
              className="bg-transparent outline-none text-default-400 text-small"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [data?.length, onRowsPerPageChange, statusFilter, statusOptions])

  const onAction = useCallback((key: Key) => {
  }, [])

  const onChangeCardStatus = useCallback((id: CardDesign['id'], status: 'enabled' | 'disabled' | 'paused') => {
    fetch(`/api/card/design?id=${ id }&status=${ status }`, {
      method: 'PATCH',
    }).then(res => res.json()).then(async () => {
      await mutate()
    })
  }, [])

  const renderCell = useCallback((item: CardDesign, columnKey: Key) => {
    const cellValue = item[columnKey as keyof CardDesign]
    switch (columnKey) {
      case 'image':
        return (
          <Image
            radius={ 'sm' }
            className={ 'h-20 hidden md:block' }
            src={ cellValue as string }
          />
        )
      case 'name':
        return (
          <div className="flex flex-col max-w-28 md:max-w-none">
            <p className="text-bold text-small capitalize">{ cellValue as string }</p>
            <p className="text-bold text-tiny capitalize text-default-400 overflow-hidden text-ellipsis">
              { item.description }
            </p>
          </div>
        )
      case 'status':
        return (
          <Chip
            size={ 'sm' }
            variant={ 'flat' }
            color={ statusColorMap[item.status] }
          >
            { statusTipMap[item.status] }
          </Chip>
        )
      case 'create_at':
        return dayjs(item.create_at).format('YYYY-MM-DD HH:mm:ss')
      case 'actions':
        const iconClasses = 'text-lg flex-shrink-0'
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <TablerDotsVertical className={ 'text-xl text-default-300' }/>
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant={ 'flat' } onAction={ onAction } disabledKeys={
                item.status !== 'disabled' ? [] : ['disable']
              }>
                <DropdownSection>
                  {
                    item.status === 'disabled'
                      ? (
                        <DropdownItem
                          key={ 'enable' }
                          color={ 'success' }
                          startContent={ <TablerPlay className={ iconClasses }/> }
                          onPress={ onChangeCardStatus.bind(null, item.id, 'enabled') }
                        >
                          启用
                        </DropdownItem>
                      )
                      : item.status === 'enabled'
                        ? (
                          <DropdownItem
                            key={ 'pause' }
                            color={ 'warning' }
                            startContent={ <TablerPause className={ iconClasses }/> }
                            onPress={ onChangeCardStatus.bind(null, item.id, 'paused') }
                          >
                            暂停
                          </DropdownItem>
                        )
                        : (
                          <DropdownItem
                            key={ 'resume' }
                            color={ 'primary' }
                            startContent={ <TablerReload className={ iconClasses }/> }
                            onPress={ onChangeCardStatus.bind(null, item.id, 'enabled') }
                          >
                            恢复
                          </DropdownItem>
                        )
                  }
                </DropdownSection>
                <DropdownItem
                  startContent={ <TablerEdit className={ iconClasses }/> }
                >
                  编辑
                </DropdownItem>
                <DropdownItem
                  key={ 'disable' }
                  color={ 'danger' }
                  startContent={ <TablerPlayerStop className={ iconClasses }/> }
                  onPress={ onChangeCardStatus.bind(null, item.id, 'disabled') }
                >
                  停用
                </DropdownItem>
                <DropdownItem
                  color={ 'danger' }
                  startContent={ <TablerTrash className={ iconClasses }/> }
                >
                  删除
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      default:
        return `${ cellValue }`
    }
  }, [])

  const onSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    fetch('/api/card/design', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        id: uuidv4(),
      }),
    }).then(res => res.json()).then(async () => {
      setFormData({} as NewCardDesign)
      onClose()
      await mutate()
    })
  }

  return (
    <>
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
                  { (columnKey) => (
                    <TableCell className={ 'whitespace-nowrap' }>
                      { renderCell(item, columnKey) }
                    </TableCell>
                  ) }
                </TableRow>
              ) }
            </TableBody>
          </Table>
        </div>
      </div>
      <Modal
        size={ 'xl' }
        hideCloseButton
        isOpen={ isOpen }
        onOpenChange={ onOpenChange }
      >
        <ModalContent
          as={ 'form' }
          onSubmit={ onSubmit }
        >
          { onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>创建新的卡面</h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  label="标题"
                  name={ 'name' }
                  value={ formData.name || '' }
                  onChange={ onChange }
                />
                <Textarea
                  label={ '描述' }
                  name={ 'description' }
                  value={ formData.description || '' }
                  onChange={ onChange }
                />
                <Input
                  isRequired
                  label="图片链接"
                  name={ 'image' }
                  value={ formData.image || '' }
                  onChange={ onChange }
                />
              </ModalBody>
              <ModalFooter className={ 'justify-between md:justify-start' }>
                <Button
                  className={ 'w-full' }
                  variant="flat"
                  size={ 'md' }
                  onPress={ onClose }
                >
                  取消
                </Button>
                <Button
                  className={ 'w-full' }
                  color="primary"
                  size={ 'md' }
                  startContent={ <TablerPlus className={ 'text-lg' }/> }
                  type={ 'submit' }
                >
                  创建
                </Button>
              </ModalFooter>
            </>
          ) }
        </ModalContent>
      </Modal>
    </>
  )
}