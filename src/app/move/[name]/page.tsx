import type { MoveDetail as MoveDetailType } from '@/types'
import TopBar from './top-bar'
import MoveDetail from './move-detail'
import MobilePage from './mobile-page'
import { fetchData } from '@/lib/fetch'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: { name: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = params.name
  const data = await fetchData<MoveDetailType>(`move/${name}`)
  if (!data) {
    notFound()
  }

  return {
    title: `宝可梦图鉴 | ${data.name}`,
    description: `宝可梦图鉴, ${data.name}`,
    keywords: [data.name]
  }
}

export default async function Page({ params }: Props) {
  const name = params.name
  const data = await fetchData<MoveDetailType>(`move/${name}`)
  if (!data) {
    notFound()
  }

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
