import { PropsWithChildren } from 'react'
import PokemonList from './pokemon-list'

export default async function Page({ children }: PropsWithChildren) {
  return (
    <div className='relative flex h-full w-full overflow-hidden'>
      <PokemonList className='w-full border-l border-l-muted  md:border-l-0 lg:w-1/3 ' />
      <div className='relative hidden w-full lg:flex lg:w-2/3 '>{children}</div>
    </div>
  )
}
