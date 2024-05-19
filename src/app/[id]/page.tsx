'use client'

import { usePathname } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { GET_POKEMON_INFO } from '@/graphql/queries'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { PokemonDetailData } from '@/typings'
import FlavorTexts from './flavor-texts'
import TypeBadge from '@/components/type-badge'
import StatBar from './stat-bar'
import EvolutionChain from './evolution-chain'
import {
  TbCircleArrowLeftFilled,
  TbCircleArrowRightFilled,
  TbArrowNarrowLeft
} from 'react-icons/tb'
import DetailSkeleton from './detail-skeleton'
import { artworkUrl } from '@/lib/constants'
import SpriteGallery from './sprites'

export default function PokemonPage() {
  const pathname = usePathname()
  const id = Number(pathname.replace('/', ''))
  const { data, loading } = useQuery<{ detail: PokemonDetailData }>(
    GET_POKEMON_INFO,
    {
      variables: {
        id: id,
        lang: 'zh-Hans'
      }
    }
  )

  if (loading) {
    return <DetailSkeleton />
  }

  if (!data) {
    return <></>
  }

  const stats = data.detail.stats
  const types = data.detail.types
  const specy = data.detail.specy
  const name = specy.names[0].name
  const texts = specy.texts
  const sprites = data.detail.sprites[0].collection

  console.log(data.detail, 998888)

  const evolutionChain = specy.evolution_chain.species

  const sortedChain = evolutionChain
    .map((i) => ({ ...i.names[0], from_id: i.from_id }))
    .sort((a, b) => a.id - b.id)
    .sort((a, b) => {
      if (a.from_id === null && b.from_id !== null) {
        return -1
      }
      if (a.from_id !== null && b.from_id === null) {
        return 1
      }
      return 0
    })

  return (
    <div className='w-full'>
      <div className='container mx-auto px-4 py-12 md:px-6 lg:px-8'>
        <div className='h-12 hover:opacity-80 md:px-4'>
          <Link href='/'>
            <TbArrowNarrowLeft className='cursor-pointer text-4xl ' />
          </Link>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <div className='flex flex-col items-center '>
            <Image
              alt='Pikachu'
              className='rounded-xl shadow-lg'
              height='400'
              src={`${artworkUrl}/${id}.png`}
              style={{
                aspectRatio: '400/400',
                objectFit: 'cover'
              }}
              width='400'
            />
            <div className='relative mt-4 flex w-full items-center justify-between text-center'>
              <Link href={`/${id - 1}`}>
                <TbCircleArrowLeftFilled className='text-4xl text-gray-400' />
              </Link>
              <div className='w-1/2'>
                <h1 className='my-4 text-4xl font-bold text-gray-900 dark:text-gray-100'>
                  {name}
                </h1>
                <div className='flex flex-col gap-4'>
                  <div className='mt-2 flex items-center justify-center'>
                    {types.map((t) => (
                      <TypeBadge value={t} key={t.type_id} />
                    ))}
                  </div>
                  <span className='rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700'>
                    {specy.names[0].genus}
                  </span>
                </div>
              </div>
              <Link href={`/${id + 1}`}>
                <TbCircleArrowRightFilled className='text-4xl text-gray-400' />
              </Link>
            </div>
          </div>
          <div className='space-y-8'>
            <div>
              <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>
                {name} {data.detail.name}
              </h2>
              <div className='grid grid-cols-2'>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    身高
                  </p>
                  <p className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                    {data.detail.height / 10} m
                  </p>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    体重
                  </p>
                  <p className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                    {data.detail.weight / 10} kg
                  </p>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    基础经验
                  </p>
                  <p className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                    {data.detail.weight}
                  </p>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    捕获率
                  </p>
                  <p className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                    {specy.capture_rate}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>
                基础数值
              </h2>
              <div className='grid grid-cols-2'>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    HP
                  </p>
                  <StatBar stat='hp' value={stats[0].base} />
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    攻击
                  </p>
                  <StatBar stat='attack' value={stats[1].base} />
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    防御
                  </p>
                  <StatBar stat='defense' value={stats[2].base} />
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    特攻
                  </p>
                  <StatBar stat='special-attack' value={stats[3].base} />
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    特防
                  </p>
                  <StatBar stat='special-defense' value={stats[4].base} />
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    速度
                  </p>
                  <StatBar stat='speed' value={stats[5].base} />
                </div>
              </div>
            </div>
            <div>
              <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>
                进化
              </h2>
              <EvolutionChain data={sortedChain} />
            </div>
            <div className='w-full overflow-x-auto'>
              <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>
                描述
              </h2>
              <FlavorTexts texts={texts} />
            </div>
            <div className='w-full overflow-x-auto'>
              <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>
                形象
              </h2>
              <SpriteGallery data={sprites} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
