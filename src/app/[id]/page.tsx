'use client'

import { usePathname } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { GET_POKEMON_INFO } from '@/graphql/queries'
import { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { PokemonDetailData } from '@/typings'
import FlavorTexts from './FlavorTexts'
import TypeBadge from '@/components/type-badge'
import StatBar from './StatBar'
import EvolutionChain from './EvolutionChain'
import { TbCircleArrowLeftFilled } from 'react-icons/tb'
import { TbCircleArrowRightFilled } from 'react-icons/tb'

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
    return <div>loading</div>
  }

  if (!data) {
    return <></>
  }

  const stats = data.detail.stats
  const types = data.detail.types
  const specy = data.detail.specy
  const name = specy.names[0].name
  const texts = specy.texts
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
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <div className='flex flex-col items-center '>
            <img
              alt='Pikachu'
              className='rounded-xl shadow-lg'
              height='400'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
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

              {/* <div className='grid grid-cols-3 gap-4'>
                <div className='rounded-lg bg-gray-100 p-4 text-center dark:bg-gray-800'>
                  <img
                    alt='Pichu'
                    className='mb-2 rounded-full'
                    height='100'
                    src='/placeholder.svg'
                    style={{
                      aspectRatio: '100/100',
                      objectFit: 'cover'
                    }}
                    width='100'
                  />
                  <p className='font-bold text-gray-900 dark:text-gray-100'>
                    Pichu
                  </p>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 text-center dark:bg-gray-800'>
                  <img
                    alt='Pikachu'
                    className='mb-2 rounded-full'
                    height='100'
                    src='/placeholder.svg'
                    style={{
                      aspectRatio: '100/100',
                      objectFit: 'cover'
                    }}
                    width='100'
                  />
                  <p className='font-bold text-gray-900 dark:text-gray-100'>
                    Pikachu
                  </p>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 text-center dark:bg-gray-800'>
                  <img
                    alt='Raichu'
                    className='mb-2 rounded-full'
                    height='100'
                    src='/placeholder.svg'
                    style={{
                      aspectRatio: '100/100',
                      objectFit: 'cover'
                    }}
                    width='100'
                  />
                  <p className='font-bold text-gray-900 dark:text-gray-100'>
                    Raichu
                  </p>
                </div>
              </div> */}
            </div>
            <FlavorTexts texts={texts} />
          </div>
        </div>
      </div>
    </div>
  )
}

// export default function PokemonPage() {
//   const pathname = usePathname()
//   const id = Number(pathname.replace('/', ''))
//   const { data, loading } = useQuery<{ detail: PokemonDetailData }>(
//     GET_POKEMON_INFO,
//     {
//       variables: {
//         id: id,
//         lang: 'zh-Hans'
//       }
//     }
//   )

//   console.log(99999999, data)

//   return (
//     <div className='mx-48 h-full font-zpix'>
//       <div className='w-full py-4'>
//         <Link href={'/'} as='div' className='flex items-center'>
//           {/* <FiArrowLeft className='text-2xl font-bold' /> */}
//           <span className='font-bold'>{'<'}</span>
//           <span className='ml-4 text-xl font-bold'>Pokedex</span>
//         </Link>
//       </div>
//       <div className='relative mx-6 flex w-full flex-row gap-4'>
//         <div className='w-1/2'>
//           <div className='flex flex-col items-center justify-center'>
//             <img
//               style={{
//                 width: '360px',
//                 height: '360px'
//               }}
//               src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
//             />
//             <div className='mb-6 flex items-start'>
//               <div className='relative flex flex-col items-center'>
//                 <span className='mb-2 text-2xl font-extrabold'>
//                   {data?.detail.specy.names[0].name}
//                 </span>
//                 <span className='text-sm'>
//                   {data?.detail.specy.names[0].genus}
//                 </span>
//               </div>
//               <span className=' ml-8 mt-1 text-gray-500'>#{id}</span>
//             </div>
//           </div>
//         </div>
//         <div className='w-1/2'>right</div>
//       </div>
//     </div>
//   )
// }
