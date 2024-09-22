'use client'

import { useEffect, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import useOnView from '@/hooks/useOnView'
import { cn } from '@/lib/utils'
import { PaginatedResponse, PokemonList, PokemonSimple } from '@/types'
import { MagnifyingGlass } from '@phosphor-icons/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import TypeBadge from '@/components/type-badge'

const PAGE_SIZE = 20
const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
  className?: string
}

function AllPokemonList({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null!)
  const isVisible = useOnView(ref)
  const [name, setName] = useState('')

  const params = useParams()

  const getKey = (
    page: number,
    previousPageData: PaginatedResponse<PokemonList> | null
  ): string | null => {
    if (previousPageData && !previousPageData.contents.length) return null
    return `/api/pokemon?page=${page}&pageSize=${PAGE_SIZE}&name=${name}`
  }
  const { data, error, isValidating, size, setSize } = useSWRInfinite<
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
  }, [isLoadingMore, isReachingEnd, isVisible, setSize, size])

  return (
    <div className={cn(className, 'border-r border-r-muted')}>
      <div className='border-b border-b-muted px-4 pb-2 pt-4 font-semibold tracking-tight text-neutral-700 dark:text-neutral-300'>
        <h1 className='font-bold'>Pokemon</h1>
      </div>
      <div className='relative h-[calc(100%-3rem-1px)] pl-4 pt-4'>
        <form>
          <div className='relative pr-4'>
            <MagnifyingGlass className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search'
              className='pl-8'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </div>
        </form>
        <ScrollArea className='h-[calc(100%-3rem-1px)] py-2 pr-4'>
          <div className='flex flex-col gap-2'>
            {data?.map((page) =>
              page.contents.map((pokemon: PokemonSimple, idx) => (
                <PokemonItem
                  key={idx}
                  data={pokemon}
                  isSelected={params.name === pokemon.name}
                />
              ))
            )}
          </div>
          <div ref={ref} className='mt-2 p-3 text-center'>
            {isLoadingMore ? 'loading...' : isReachingEnd ? '' : 'load more'}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default AllPokemonList

interface PokemonItemProps {
  data: PokemonSimple
  isSelected: boolean
}

function PokemonItem({ data, isSelected }: PokemonItemProps) {
  const { index, name, name_en, types, meta } = data
  const linkName = name.split('-')[0]
  return (
    <Link
      href={`/pokemon/${linkName}`}
      className={cn(
        'flex flex-row items-center gap-4 rounded-lg border px-4 py-3 text-left text-sm transition-all hover:bg-accent',
        isSelected ? 'bg-muted' : ''
      )}
    >
      <div className='flex items-center'>
        <span
          className='pokemon-normal'
          style={{
            backgroundPosition: meta.icon_position
          }}
        ></span>
        {/* <img src={sprite_home!} alt={name_local!} className='h-16 w-16' /> */}
      </div>
      <div className='ml-2 flex flex-grow flex-col items-center'>
        <div className='flex h-[56px] w-full items-center justify-between'>
          <div className='flex h-full flex-col justify-evenly'>
            <span>{name}</span>

            <div className='flex gap-2'>
              {types.map((type) => (
                <TypeBadge key={type} type={type} size='small' />
              ))}
            </div>
          </div>
          <span className='text-xs'>#{index}</span>
        </div>
        <div></div>
      </div>
      {/* </button> */}
    </Link>
  )
}
