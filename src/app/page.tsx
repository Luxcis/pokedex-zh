'use client'

import { GET_POKEMONS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { InView } from 'react-intersection-observer'
import { PiCaretDownFill } from "react-icons/pi";
import { useState } from 'react'
import PokemonCard from './PokemonCard'
import { types } from '@/lib/constants'
import { TbSearch } from 'react-icons/tb'
import { Input, Button, Select, SelectItem, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from '@nextui-org/react'

interface Pokemon {
  no: number
  name: string
  localName: string
  types: { id: number; name: string; localName: string; color: string }[]
}

const sorts = [
  { value: '1', label: '按编号排列' },
  { value: '2', label: '按名字排列' }
]

export default function Home() {
  const [sort, setSort] = useState('1')
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
            color: types.find((i) => i.id === type.type_id)?.color || '#ff0000'
          }))
        }
      })

      console.log(9999, pokemons)

      setPokemons(pokemons)
    }
  })


  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div className='mx-48 h-full'>
      {/* <header className='p-6 text-center text-4xl font-bold'>
        POKEDEX-NEXT
      </header> */}
      <main className='py-4'>
        <div className='w-full h-14'>
          <Input
          variant='bordered'
          size='lg'
          placeholder="输入名称，编号或属性"
          labelPlacement="outside"
          classNames={{
            mainWrapper: "border-2 rounded-md border-theme hover:border-2",
            inputWrapper: "border-none ",
          }}
          startContent={
            <TbSearch className='text-2xl text-theme opacity-60' />
          }
          endContent={
            <Button className='h-8 bg-sub-theme text-theme'>搜索</Button>
          }
        />
        </div>


        <div className='flex w-full pt-8'>
          <div className='mr-4 w-1/4'>
            <div className='flex h-12 w-full items-center'>
              <Select
                items={types}
                onChange={(e) => {
                  console.log(9998888, e.target.value)
                }}
                aria-label='type'
                variant='bordered'
                placeholder='选择属性'
                selectionMode="multiple"
                classNames={{
                  mainWrapper: "border-2 rounded-md border-theme hover:border-2",
                  trigger: "border-none"
                }}
              >
              {
                (type) => (<SelectItem key={type.name} textValue={type.name} value={type.name}>
                  <div className='flex gap-2 items-center'>
                    <span>{type.name}</span>
                  </div>
                </SelectItem>)
              }
              </Select>
            </div>
          </div>
          <div className='ml-4 w-3/4'>
            <div className='flex h-12 items-center justify-between'>
              <div className='w-36'>
              <Select 
                variant='bordered'
                className="max-w-xs"
                aria-label='sorts'
                classNames={{
                  mainWrapper: "border-none shadow-none",
                  innerWrapper: "shadow-none",
                  trigger: "border-none shadow-none"
                }}
                selectedKeys={[sort]}
                // value={sort}
                onChange={(e) => 
                  setSort(e.target.value)
                }
              >
                {sorts.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              </div>
              <div className='flex items-center'>
                <span className='mr-4'>
                  编号范围:
                </span>
                <div className='flex items-center h-8 justify-evenly'>
                  <Input type='number' label='' size='sm' className='w-30'
                    variant='bordered'
                    classNames={{
                      mainWrapper: "border-2 rounded-md border-theme hover:border-2",
                      inputWrapper: "border-none hover:bg-transparent",
                    }}
                  />
                  <span className='px-4'>-</span>
                  <Input type='number' label='' size='sm' className='w-30'
                    variant='bordered'
                    classNames={{
                      mainWrapper: "border-2 rounded-md border-theme hover:border-2",
                      inputWrapper: "border-none hover:bg-transparent",
                    }}
                  />
                </div>
                
                </div>
            </div>

            <div className='grid grid-cols-3 gap-2'>
              {/* {pokemons.map((item) => (
                <PokemonCard
                  key={item.no}
                  no={item.no}
                  types={item.types}
                  name={item.localName}
                />
              ))} */}
            </div>
            {/* {pokemons.length > 0 && (
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
            )} */}
          </div>
        </div>
      </main>
    </div>
  )
}
