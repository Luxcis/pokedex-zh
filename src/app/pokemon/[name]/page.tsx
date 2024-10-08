import type { PokemonDetail as PokemonDetailType } from '@/types'
import PokemonDetail from './pokemon-detail'
import TopBar from './top-bar'
import MobilePage from './mobile-page'

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

  console.log(222222, data.forms)

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
