'use client'

import { GET_POKEMONS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { InView } from 'react-intersection-observer'
import { useState } from 'react'
import PokemonCard from './PokemonCard'
import { TYPES } from '@/lib/constants'
import { TbSearch } from 'react-icons/tb'
import MultiSelect from '@/components/ui/multi-select'
import SimpleSelect from '@/components/ui/simple-select'
import { SingleValue } from 'react-select'

interface Pokemon {
  no: number
  name: string
  localName: string
  types: { id: number; name: string; localName: string; color: string }[]
}

const SortOptions = [
  { value: '1', label: '按编号排列' },
  { value: '2', label: '按名字排列' }
]

export default function Home() {
  const [sortOption, setSortOption] = useState<
    SingleValue<{ value: string; label: string }>
  >({
    value: '1',
    label: '按编号排列'
  })
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const { data, loading, fetchMore, error } = useQuery(GET_POKEMONS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      langId: 12,
      limit: 12,
      offset: 0
    },
    onCompleted: (data) => {
      const originalData = data.pokemon_v2_pokemon as any[]
      const pokemons: Pokemon[] = originalData.map((item) => {
        return {
          no: item.id,
          name: item.name,
          localName:
            item.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0].name,
          types: item.pokemon_v2_pokemontypes.map((type: any) => ({
            id: type.type_id,
            name: type.pokemon_v2_type.name,
            localName: type.pokemon_v2_type.pokemon_v2_typenames[0]?.name,
            color: TYPES.find((i) => i.id === type.type_id)?.color || '#ff0000'
          }))
        }
      })

      console.log(9999, pokemons)

      setPokemons(pokemons)
    }
  })

  const handleTypesChange = (value) => {
    console.log(value)
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div className='mx-48 h-full'>
      <header className='p-6 text-center text-4xl font-bold'>
        POKEDEX-NEXT
      </header>
      <main>
        <div className='relative flex h-14 w-full items-center'>
          <TbSearch className='text-theme absolute left-4 text-2xl opacity-60' />
          <input
            className='outline-theme h-14 w-full rounded-lg py-2 pl-12 text-xl outline-2 placeholder:text-base placeholder:font-normal focus:outline-4'
            placeholder='名称，编号或类型'
          />
          <button className='text-theme bg-sub-theme absolute right-4 rounded-md px-6 py-1 text-base font-normal'>
            搜索
          </button>
        </div>
        <div className='flex w-full pt-8'>
          <div className='mr-4 w-1/4'>
            <div className='flex h-12 w-full items-center'>
              <MultiSelect
                placeholder='选择属性'
                onChange={handleTypesChange}
                options={[
                  { value: 'chocolate', label: '草' },
                  { value: 'strawberry', label: '毒' },
                  { value: 'vanilla', label: '水' }
                ]}
              />
            </div>
          </div>
          <div className='ml-4 w-3/4'>
            <div className='flex h-12 items-center justify-between'>
              <div className='bg-transparent'>
                <SimpleSelect
                  onChange={(option) => setSortOption(option)}
                  defaultValue={sortOption}
                  options={SortOptions}
                />
              </div>
              <div>编号范围</div>
            </div>

            <div className='grid grid-cols-3 gap-2'>
              {pokemons.map((item) => (
                <PokemonCard
                  key={item.no}
                  no={item.no}
                  types={item.types}
                  name={item.localName}
                />
              ))}
            </div>
            {pokemons.length > 0 && (
              <InView
                as='div'
                className='h-6'
                threshold={0}
                rootMargin='25px 0px'
                onChange={(inView) => {
                  if (inView) {
                    fetchMore({
                      variables: {
                        limit: 12,
                        offset: pokemons.length
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev
                        return {
                          pokemon_v2_pokemon: [
                            ...prev.pokemon_v2_pokemon,
                            ...fetchMoreResult.pokemon_v2_pokemon
                          ]
                        }
                      }
                    })
                  }
                }}
              ></InView>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
