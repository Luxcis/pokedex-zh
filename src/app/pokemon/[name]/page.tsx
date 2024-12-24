import type {
  AbilityDetail,
  PokemonDetail as PokemonDetailType,
  PokemonSimple
} from '@/types'
import PokemonDetail from './pokemon-detail'
import TopBar from './top-bar'
import MobilePage from './mobile-page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findFile, readFile } from '@/lib/file'

type Props = {
  params: { name: string }
}

const getDetailData = async (name: string) => {
  try {
    const file = await findFile(name, 'pokemon')
    if (file) {
      const data = await readFile<PokemonDetailType>(`pokemon/${file}`)
      await Promise.all(
        data.forms.map(async (form) => {
          await Promise.all(
            form.ability.map(async (a) => {
              const aFile = await findFile(a.name, 'ability')
              const detail = await readFile<AbilityDetail>(`ability/${aFile}`)
              a.text = detail.text
            })
          )
        })
      )
      return data
    }
    return null
  } catch (err) {
    return null
  }
}

export async function generateStaticParams() {
  const list = await readFile<PokemonSimple[]>('pokemon_list.json')
  return list.map((item) => ({
    name: item.name
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = params
  const data = await getDetailData(name)

  if (!data) {
    notFound()
  }

  return {
    title: `宝可梦图鉴 | ${data.name}`,
    description: `宝可梦图鉴, ${data.name}`,
    keywords: [data.name]
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg']
    // }
  }
}

export default async function Page({ params }: Props) {
  const { name } = params
  const data = await getDetailData(name)

  if (!data) {
    notFound()
  }

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
