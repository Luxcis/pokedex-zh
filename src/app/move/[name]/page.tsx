import type { MoveDetail as MoveDetailType } from '@/types'
import TopBar from './top-bar'
import MoveDetail from './move-detail'
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
  const data = await fetchData<MoveDetailType>(`move/${name}`)

  return (
    <>
      <div className='relative hidden w-full lg:block lg:w-2/3'>
        <TopBar name={data.name} />
        <MoveDetail data={data} />
      </div>
      <MobilePage data={data} />
    </>
  )
}
