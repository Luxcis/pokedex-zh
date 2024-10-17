import type { AbilityDetail as AbilityDetailType } from '@/types'
import TopBar from './top-bar'
import AbilityDetail from './ability-detail'
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
  const data = await fetchData<AbilityDetailType>(`ability/${name}`)

  return (
    <>
      <div className='relative hidden w-full lg:block lg:w-2/3'>
        <TopBar name={data.name} index={data.index} />
        <AbilityDetail data={data} />
      </div>
      <MobilePage data={data} />
    </>
  )
}
