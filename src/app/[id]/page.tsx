'use client'

import { usePathname } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { GET_POKEMON_INFO } from '@/graphql/queries'
import { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { parseStats, parseTypes } from '@/lib/parsers'

interface PokemonInfo {
  id: number
  name: string
  localName: string
  genus: string
  height: number
  weight: number
  baseExperience: number
  isDefault: boolean
  flavorTexts: { text: string; versionId: number }[]
  stats: {
    id: number
    name: string
    localName: string
    base: number
    effort: number
  }[]
  types: { id: number; name: string; localName: string; color: string }[]
}

export default function PokemonPage() {
  const pathname = usePathname()
  const id = Number(pathname.replace('/', ''))
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>()

  const { data, loading } = useQuery(GET_POKEMON_INFO, {
    variables: {
      id: id
    },
    onCompleted: (data) => {
      const pkInfo = data.pokemon_v2_pokemon_by_pk

      console.log(888888, pkInfo)

      const pokemonInfo: PokemonInfo = {
        id: id,
        name: pkInfo.name,
        height: pkInfo.height,
        weight: pkInfo.weight,
        baseExperience: pkInfo.base_experience,
        isDefault: pkInfo.is_default,
        localName:
          pkInfo.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0].name,
        genus:
          pkInfo.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0]
            .genus,
        flavorTexts:
          pkInfo.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts.map(
            (i: any) => ({ text: i.flavor_text, versionId: i.version_id })
          ),
        stats: parseStats(pkInfo.pokemon_v2_pokemonstats),
        types: parseTypes(pkInfo.pokemon_v2_pokemontypes)
      }

      console.log(888888, pokemonInfo)

      setPokemonInfo(pokemonInfo)
    }
  })

  return (
    <div className='mx-48 mt-12 h-full'>
      <div className='h-12 w-full'>
        <Link href={'/'} as='div' className='flex items-center'>
          <FiArrowLeft className='text-2xl' />
          <span className='ml-4 text-xl font-bold'>Pokedex</span>
        </Link>
      </div>
      <div className='relative mx-6 flex w-full flex-row'>
        <div className='w-2/5'>
          <div className='mb-6 flex items-start'>
            <span className='text-3xl font-extrabold'>
              {pokemonInfo?.localName}
            </span>
            <span className='ml-8 mt-1 text-gray-500'>#{id}</span>
          </div>
          <img
            style={{
              width: '80px',
              height: '80px'
            }}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`}
          />
          <div className='mt-4 flex items-end justify-center gap-2'>
            {pokemonInfo?.types.map((type) => (
              <span
                className='min-w-10 rounded-md px-2 py-1 text-center text-sm capitalize'
                key={type.name}
                style={{
                  background: type.color
                }}
              >
                {type.localName}
              </span>
            ))}
          </div>
        </div>
        <div className='w-3/5'>right</div>

        {/* <Image
          width={120}
          height={120}
          alt='pokemon'
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`}
        /> */}
      </div>
    </div>
  )
}
