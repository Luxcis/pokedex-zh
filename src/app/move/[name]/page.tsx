import type { MoveDetail as MoveDetailType } from '@/types'
import TopBar from './top-bar'
import MoveDetail from './move-detail'
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

  const res = await fetch(`${baseUrl}/api/move/${name}`)
  const data = (await res.json()) as MoveDetailType

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
