import { PropsWithChildren } from 'react'
import PokemonList from './pokemon-list'
import { fetchData } from '@/lib/fetch'
import type { PaginatedResponse, PokemonList as PokemonListType } from '@/types'

export default async function Page({ children }: PropsWithChildren) {
  const data = await fetchData<PaginatedResponse<PokemonListType>>(
    'pokemon?page=0&pageSize=30'
  )

  return (
    <div className='relative flex h-full w-full overflow-hidden'>
      <PokemonList
        initialData={data.contents}
        className='w-full border-l border-l-muted  md:border-l-0 lg:w-1/3 '
      />
      {children}
    </div>
  )
}
