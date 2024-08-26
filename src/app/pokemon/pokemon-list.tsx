'use client'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { PaginatedResponse, SpeciesList, SpeciesSimple } from '@/types'
import { MagnifyingGlass } from '@phosphor-icons/react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function PokemonList() {
  const { data, isLoading } = useSWR<PaginatedResponse<SpeciesList>>(
    '/api/species',
    fetcher
  )

  console.log('data', data)

  return (
    <div className='w-1/3 min-w-72 max-w-96 border-r border-r-muted'>
      <div className='border-b border-b-muted px-4 pb-2 pt-4 font-semibold tracking-tight text-neutral-700 dark:text-neutral-300'>
        <h1 className='font-bold'>Pokemon</h1>
      </div>
      <div className='relative h-[calc(100%-3rem-1px)] pl-4 pt-4'>
        <form>
          <div className='relative pr-4'>
            <MagnifyingGlass className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input placeholder='Search' className='pl-8' />
          </div>
        </form>
        <ScrollArea className='h-[calc(100%-3rem-1px)] py-2 pr-4'>
          <div className='flex flex-col gap-2'>
            {data?.result.map((pokemon) => (
              <PokemonItem key={pokemon.id} {...pokemon} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default PokemonList

function PokemonItem({ id, name_local, sprite_home }: SpeciesSimple) {
  return (
    <button
      className={cn(
        'flex flex-row items-center gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
        // mail.selected === item.id && 'bg-muted'
      )}
    >
      <div className='flex items-center'>
        <img src={sprite_home!} alt={name_local!} className='h-16 w-16' />
      </div>
      <div className='ml-2 flex flex-grow flex-col items-center'>
        <div className='flex w-full items-center justify-between'>
          <span className=''>{name_local}</span>
          <span className='text-xs'>#{id}</span>
        </div>
        <div></div>
      </div>
    </button>
  )
}
