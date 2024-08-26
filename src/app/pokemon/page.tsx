import PokemonDetail from './pokemon-detail'
import PokemonList from './pokemon-list'

export default async function Page() {
  return (
    <div className='flex h-full w-full flex-row'>
      <PokemonList />
      <PokemonDetail />
    </div>
  )
}
