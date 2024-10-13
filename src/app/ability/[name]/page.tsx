import type { AbilityDetail as AbilityDetailType } from '@/types'
import TopBar from './top-bar'
import AbilityDetail from './ability-detail'
// import PokemonDetail from './pokemon-detail'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export default async function Page({
  params
}: {
  params: {
    name: string
  }
}) {
  const name = params.name

  const res = await fetch(`${baseUrl}/api/ability/${name}`)
  const data = (await res.json()) as AbilityDetailType

  return (
    <>
      <div className='relative hidden w-full lg:block lg:w-2/3'>
        <TopBar name={data.name} index={data.index} />
        <AbilityDetail data={data} />

        {/* <PokemonDetail data={data} /> */}
      </div>
      {/* <MobilePage data={data} /> */}
    </>
  )
}
