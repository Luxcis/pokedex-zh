import type { PokemonDetail as PokemonDetailType, SpeciesDetail } from '@/types'
import PokemonDetail from './pokemon-detail'
import TopBar from './top-bar'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export default async function Page({
  params
}: {
  params: {
    name: string
  }
}) {
  const name = params.name
  const res = await fetch(`${baseUrl}/api/pokemon/${name}`)
  const data = (await res.json()) as PokemonDetailType

  return (
    <div className='relative w-full'>
      <TopBar name={data.name} />
      <PokemonDetail data={data} />
    </div>
  )
}
