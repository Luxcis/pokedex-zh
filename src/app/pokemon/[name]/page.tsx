import type { PokemonDetail as PokemonDetailType } from '@/types'
import PokemonDetail from './pokemon-detail'
import TopBar from './top-bar'
import MobilePage from './mobile-page'
import { fetchData } from '@/lib/fetch'

export default async function Page({
  params
}: {
  params: {
    name: string
  }
}) {
  const name = params.name
  const data = await fetchData<PokemonDetailType>(`pokemon/${name}`)

  return (
    <>
      <div className='relative hidden w-full lg:block lg:w-2/3'>
        <TopBar name={data.name} index={data.forms[0].index} />
        <PokemonDetail data={data} />
      </div>
      <MobilePage data={data} />
    </>
  )
}
