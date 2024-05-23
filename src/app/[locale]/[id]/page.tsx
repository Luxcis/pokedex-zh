import { print } from 'graphql'
import Image from 'next/image'
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
import { GET_POKEMON_INFO } from '@/graphql/queries'
import { artworkUrl } from '@/lib/constants'
import SpriteGallery from './sprites'
import { Link } from '@/navigation'
import { getTranslations } from 'next-intl/server'

export default async function PokemonPage({
  params
}: {
  params: { id: string; locale: any }
}) {
  const t = await getTranslations('Detail')

  const id = Number(params['id'])
  const locale = params.locale
  const res = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      query: print(GET_POKEMON_INFO),
      variables: {
        id: id,
        lang: locale
      }
    })
  }).then((res) => res.json())

  const data = res.data.detail as PokemonDetailData

  if (!data) {
    return <></>
  }

  const stats = data.stats
  const types = data.types
  const specy = data.specy
  const name = specy.names[0].name
  const texts = specy.texts
  const sprites = data.sprites[0].collection
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
          <Link href='/' className='flex items-center'>
            <TbArrowNarrowLeft className='mr-4 cursor-pointer text-4xl ' />
            <h1 className='text-2xl font-bold'>{name}</h1>
          </Link>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <div className='flex flex-col items-center '>
            <Image
              alt={name}
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
              <Link href={`/${id - 1}`} locale={locale}>
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
              <Link href={`/${id + 1}`} locale={locale}>
                <TbCircleArrowRightFilled className='text-4xl text-gray-400' />
              </Link>
            </div>
          </div>
          <div className='space-y-8'>
            <div>
              <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>
                {/* {name} {data.name} */}
                {t('info')}
              </h2>
              <div className='grid grid-cols-2'>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    {t('height')}
                  </p>
                  <p className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                    {data.height / 10} m
                  </p>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    {t('weight')}
                  </p>
                  <p className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                    {data.weight / 10} kg
                  </p>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    {t('base_experience')}
                  </p>
                  <p className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                    {data.weight}
                  </p>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    {t('catch_rate')}
                  </p>
                  <p className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                    {specy.capture_rate}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>
                {t('base_stat')}
              </h2>
              <div className='grid grid-cols-2'>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    {t('stat.hp')}
                  </p>
                  <StatBar stat='hp' value={stats[0].base} />
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    {t('stat.attack')}
                  </p>
                  <StatBar stat='attack' value={stats[1].base} />
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    {t('stat.defense')}
                  </p>
                  <StatBar stat='defense' value={stats[2].base} />
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    {t('stat.sp-attack')}
                  </p>
                  <StatBar stat='special-attack' value={stats[3].base} />
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    {t('stat.sp-defense')}
                  </p>
                  <StatBar stat='special-defense' value={stats[4].base} />
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    {t('stat.speed')}
                  </p>
                  <StatBar stat='speed' value={stats[5].base} />
                </div>
              </div>
            </div>
            <div>
              <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>
                {t('evolution')}
              </h2>
              <EvolutionChain data={sortedChain} />
            </div>
            <div className='w-full overflow-x-auto'>
              <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>
                {t('flavor_text')}
              </h2>
              <FlavorTexts texts={texts} />
            </div>
            <div className='w-full overflow-x-auto'>
              <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>
                {t('sprite')}
              </h2>
              <SpriteGallery data={sprites} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
