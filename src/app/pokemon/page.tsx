import PokemonDetail from './pokemon-detail'
import PokemonList from './pokemon-list'

export default async function Page() {
  return (
    <div className='flex h-full w-full flex-row'>
      <PokemonList className='w-full border-l border-l-muted md:w-full md:border-l-0 lg:w-1/3 lg:min-w-72 lg:max-w-96 ' />
      <PokemonDetail className='hidden lg:flex ' />
    </div>
  )
}
