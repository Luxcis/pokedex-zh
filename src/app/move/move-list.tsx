'use client'

import { useEffect, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import useOnView from '@/hooks/useOnView'
import { cn } from '@/lib/utils'
import {
  Category,
  Generation,
  MoveList,
  MoveSimple,
  Order,
  PaginatedResponse,
  PokemonList,
  Type
} from '@/types'
import { MagnifyingGlass } from '@phosphor-icons/react'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { GENERATIONS, TYPES } from '@/lib/constants'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import TypeBadge from '@/components/type-badge'
import CategoryBadge from '@/components/category-badge'

const PAGE_SIZE = 30
const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
  initialData: MoveList
  className?: string
}

interface FilterOptions {
  type: Type | null
  category: Category | null
  generation: Generation | null
  order: Order
}

function AllMoveList({ initialData, className }: Props) {
  const ref = useRef<HTMLDivElement>(null!)
  const isVisible = useOnView(ref)
  const [fetched, setFetched] = useState(false)
  const [moveList, setMoveList] = useState<MoveList>(initialData)
  const [name, setName] = useState('')
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    type: null,
    category: null,
    generation: null,
    order: 'asc'
  })

  const getKey = (
    page: number,
    previousPageData: PaginatedResponse<MoveList> | null
  ): string | null => {
    if (previousPageData && !previousPageData.contents.length) return null
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: PAGE_SIZE.toString(),
      name: name,
      order: filterOptions.order
    })

    if (filterOptions.generation)
      params.append('generation', filterOptions.generation)
    if (filterOptions.type) params.append('type', filterOptions.type)
    if (filterOptions.category)
      params.append('category', filterOptions.category)

    return `/api/move?${params.toString()}`
  }
  const { data, error, size, setSize } = useSWRInfinite<
    PaginatedResponse<PokemonList>
  >(getKey, fetcher)

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0].contents?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.contents.length < PAGE_SIZE)

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isLoadingMore) {
      setSize(size + 1)
    }
    if (data) {
      setFetched(true)
      const newList: MoveList = []
      data.forEach((page) =>
        page.contents.map((p: MoveSimple) => {
          newList.push(p)
        })
      )
      if (fetched) {
        setMoveList(newList)
      } else {
        if (size > 1) {
          setMoveList(newList)
        }
      }
    }
  }, [
    data,
    fetched,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    isVisible,
    setSize,
    size
  ])

  return (
    <div className={cn(className, 'border-r border-r-muted')}>
      <div className='border-b border-b-muted px-4 pb-2 pt-4 font-semibold tracking-tight text-neutral-700 dark:text-neutral-300'>
        <h1 className='font-bold'>招式列表</h1>
      </div>
      <div className='relative h-[calc(100%-3rem-1px)] pl-4 pt-4'>
        <div className='relative pr-4'>
          <MagnifyingGlass className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='搜索招式'
            className='pl-8'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <div className='relative flex h-[calc(100%-3rem-1px)] flex-col pb-2 pr-4'>
          <FilterOptions
            options={filterOptions}
            onOptionsChange={(v) => {
              setFilterOptions(v)
            }}
          />
          <ScrollArea className='flex-grow'>
            <div className='flex flex-col gap-2'>
              {moveList.map((move, idx) => (
                <MoveItem key={idx} data={move} />
              ))}
            </div>
            <div ref={ref} className='mt-2 p-3 text-center text-sm'>
              {isLoadingMore
                ? '加载中...'
                : isReachingEnd
                  ? `共${data[0].total}个`
                  : '加载更多'}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export default AllMoveList

function MoveItem({ data }: { data: MoveSimple }) {
  const { index, name } = data
  return (
    <Link
      href={`/move/${name}`}
      className='flex flex-row items-center gap-4 rounded-lg border px-4 py-3 text-left text-sm transition-all hover:bg-accent'
    >
      <div className='ml-2 flex flex-grow flex-col items-center'>
        <div className='flex h-[26px] w-full items-center justify-between'>
          <div className='flex h-full flex-col justify-evenly'>
            <span>{name}</span>
          </div>

          <div className='flex items-center gap-2'>
            <TypeBadge type={data.type} size='small' />
            <CategoryBadge type={data.category} size='small' />
            <span className='ml-2 text-xs'>#{index}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function FilterOptions({
  options,
  onOptionsChange
}: {
  options: FilterOptions
  onOptionsChange: (v: FilterOptions) => void
}) {
  const handleTypeClick = (type: Type) => {
    const newOptions = { ...options }

    if (!options.type) {
      newOptions.type = type
    } else {
      newOptions.type = null
    }
    onOptionsChange(newOptions)
  }

  const handleGenClick = (gen: Generation) => {
    const newOptions = { ...options }

    if (newOptions.generation === gen) {
      newOptions.generation = null
    } else {
      newOptions.generation = gen
    }
    onOptionsChange(newOptions)
  }

  const handleOrderChange = (v: Order) => {
    onOptionsChange({
      ...options,
      order: v
    })
  }

  const handleClear = () => {
    onOptionsChange({
      ...options,
      type: null,
      category: null,
      generation: null
    })
  }

  return (
    <Accordion type='single' collapsible className='pr-4'>
      <AccordionItem value='filter' className='border-b-0'>
        <AccordionTrigger className='justify-end gap-2 hover:no-underline'>
          筛选
        </AccordionTrigger>
        <AccordionContent className=''>
          <div className='flex flex-wrap gap-2'>
            {TYPES.filter((t) => t !== '未知').map((type) => (
              <TypeBadge
                key={type}
                type={type}
                active={options.type === type}
                size='normal'
                onClick={handleTypeClick}
              />
            ))}
            <Separator className='my-1 h-[0.5px]' />
            {GENERATIONS.map((gen) => (
              <div
                key={gen}
                className={cn(
                  'cursor-pointer rounded px-2 py-0.5',
                  options.generation === gen
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
                onClick={() => handleGenClick(gen)}
              >
                {gen}
              </div>
            ))}
            <Separator className='my-1 h-[0.5px]' />
            <RadioGroup
              defaultValue={options.order}
              onValueChange={handleOrderChange}
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='asc' id='r1' />
                <Label htmlFor='r1'>顺序排列</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='desc' id='r2' />
                <Label htmlFor='r2'>倒序排列</Label>
              </div>
            </RadioGroup>
          </div>
          <div className='text-right'>
            <Button variant='ghost' onClick={handleClear}>
              清除筛选
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
