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
import { CardDesign, CardDesignUpdate, NewCardDesign } from '@/app/actions/types'
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
import { useTranslations } from 'next-intl'

export default function Main() {
  const t = useTranslations('dash.cards')
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [formData, setFormData] = useState({} as NewCardDesign)
  const [isEdit, setIsEdit] = useState(false)

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
      { key: 'name', title: t('title'), sortable: true },
      { key: 'status', title: t('status'), sortable: true },
      { key: 'create_at', title: t('created_at'), sortable: true },
      { key: 'actions', title: t('actions') },
    ]
  }, [])

  const statusOptions = useMemo(() => {
    return [
      { name: 'disabled', uid: 'disabled' },
      { name: 'enabled', uid: 'enabled' },
      { name: 'paused', uid: 'paused' },
    ]
  }, [])

  const statusColorMap: Record<string, ChipProps['color']> = {
    enabled: 'success',
    disabled: 'default',
    paused: 'warning',
  }

  const statusTipMap: Record<string, string> = {
    enabled: t('enabled'),
    disabled: t('disabled'),
    paused: t('paused'),
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
            placeholder={ t('search_placeholder') }
            startContent={ <TablerSearch className={ 'text-xl' }/> }
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={ <ChevronDownIcon className="text-small"/> } variant="flat">
                  { t('status_filter') }
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
                    { t(status.name) }
                  </DropdownItem>
                )) }
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              endContent={ <TablerPlus className={ 'text-xl' }/> }
              onClick={ onOpen }
            >
              { t('new_card_design') }
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            { t('total_count', { count: data?.length || '-' }) }
          </span>
          <label className="flex items-center text-default-400 text-small">
            { t('per_page_count') }
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
  }, [data?.length, onOpen, onRowsPerPageChange, statusFilter, statusOptions])

  const onAction = useCallback((key: Key) => {
  }, [])

  const onChangeCardStatus = useCallback((id: CardDesign['id'], status: 'enabled' | 'disabled' | 'paused') => {
    fetch(`/api/card/design?id=${ id }&status=${ status }`, {
      method: 'PATCH',
    }).then(res => res.json()).then(async () => {
      await mutate()
    })
  }, [mutate])

  const onEdit = useCallback((id: CardDesign['id'], card: CardDesignUpdate) => {
    fetch(`/api/card/design?id=${ id }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    }).then(res => res.json()).then(async () => {
      setFormData({} as NewCardDesign)
      setIsEdit(false)
      onClose()
      await mutate()
    })
  }, [mutate, onClose])

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

  const renderCell = useCallback((item: CardDesign, columnKey: Key) => {
    const cellValue = item[columnKey as keyof CardDesign]
    switch (columnKey) {
      case 'image':
        return (
          <Image
            alt={ item.name || '' }
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
                          { t('enable') }
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
                            { t('pause') }
                          </DropdownItem>
                        )
                        : (
                          <DropdownItem
                            key={ 'resume' }
                            color={ 'primary' }
                            startContent={ <TablerReload className={ iconClasses }/> }
                            onPress={ onChangeCardStatus.bind(null, item.id, 'enabled') }
                          >
                            { t('resume') }
                          </DropdownItem>
                        )
                  }
                </DropdownSection>
                <DropdownItem
                  startContent={ <TablerEdit className={ iconClasses }/> }
                  onPress={ () => {
                    setFormData({
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      image: item.image,
                    } as NewCardDesign)
                    setIsEdit(true)
                    onOpen()
                  } }
                >
                  { t('edit') }
                </DropdownItem>
                <DropdownItem
                  key={ 'disable' }
                  color={ 'danger' }
                  startContent={ <TablerPlayerStop className={ iconClasses }/> }
                  onPress={ onChangeCardStatus.bind(null, item.id, 'disabled') }
                >
                  { t('disable') }
                </DropdownItem>
                <DropdownItem
                  color={ 'danger' }
                  startContent={ <TablerTrash className={ iconClasses }/> }
                >
                  { t('delete') }
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      default:
        return `${ cellValue }`
    }
  }, [onAction, onChangeCardStatus, statusColorMap, statusTipMap])

  return (
    <>
      <div className={ 'px-4' }>
        <h1 className={ `text-2xl font-semibold mt-8 mb-4 ${ saira.className }` }>
          { t('page_title') }
        </h1>
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
              emptyContent={ t('no_rows') }
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
        onOpenChange={ () => {
          onOpenChange()
          setIsEdit(false)
          setFormData({} as NewCardDesign)
        } }
      >
        <ModalContent
          as={ 'form' }
          onSubmit={
            isEdit
              ? (e) => {
                e.preventDefault()
                onEdit(
                  formData.id as string,
                  formData as CardDesignUpdate,
                )
              }
              : onSubmit
          }
        >
          { onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>{ isEdit ? t('edit_card') : t('create_card') }</h1>
                { isEdit && <p className="text-xs font-semibold text-primary-500">ID: { formData.id }</p> }
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  label={ t('title') }
                  name={ 'name' }
                  value={ formData.name || '' }
                  onChange={ onChange }
                />
                <Textarea
                  label={ t('description') }
                  name={ 'description' }
                  value={ formData.description || '' }
                  onChange={ onChange }
                />
                <Input
                  isRequired
                  label={ t('image_url') }
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
                  { t('cancel') }
                </Button>
                <Button
                  className={ 'w-full' }
                  color="primary"
                  size={ 'md' }
                  startContent={ isEdit ? <TablerEdit className={ 'text-lg' }/> :
                    <TablerPlus className={ 'text-lg' }/> }
                  type={ 'submit' }
                >
                  { isEdit ? t('edit') : t('create') }
                </Button>
              </ModalFooter>
            </>
          ) }
        </ModalContent>
      </Modal>
    </>
  )
}