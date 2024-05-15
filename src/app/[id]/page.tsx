'use client'

import { usePathname } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { GET_POKEMON_INFO } from '@/graphql/queries'
import { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { parseStats, parseTypes } from '@/lib/parsers'
import { PokemonDetailData } from '@/typings'

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

  console.log(99999999, data)

  return (
    <div className='mx-48 h-full font-zpix'>
      <div className='w-full py-4'>
        <Link href={'/'} as='div' className='flex items-center'>
          {/* <FiArrowLeft className='text-2xl font-bold' /> */}
          <span className='font-bold'>{'<'}</span>
          <span className='ml-4 text-xl font-bold'>Pokedex</span>
        </Link>
      </div>
      <div className='relative mx-6 flex w-full flex-row gap-4'>
        <div className='w-1/2'>
          <div className='flex flex-col items-center justify-center'>
            <img
              style={{
                width: '360px',
                height: '360px'
              }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            />
            <div className='mb-6 flex items-start'>
              <div className='relative flex flex-col items-center'>
                <span className='mb-2 text-2xl font-extrabold'>
                  {data?.detail.specy.names[0].name}
                </span>
                <span className='text-sm'>
                  {data?.detail.specy.names[0].genus}
                </span>
              </div>
              <span className=' ml-8 mt-1 text-gray-500'>#{id}</span>
            </div>
          </div>
        </div>
        <div className='w-1/2'>right</div>
      </div>
    </div>
  )
}
