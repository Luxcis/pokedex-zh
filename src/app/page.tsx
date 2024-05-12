'use client'

import { GET_POKEMONS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { InView } from 'react-intersection-observer'
import { useState } from 'react'
import PokemonCard from './PokemonCard'
import { typeList } from '@/lib/constants'
import { TbSearch } from 'react-icons/tb'
import { Input } from '@nextui-org/react'
import { PokemonData } from '@/types'
import TypeSelect from '@/components/TypeSelect'

const sorts = [
  { value: '1', label: '按编号排列' },
  { value: '2', label: '按名字排列' }
]

export default function Home() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('1')
  const { data, loading, fetchMore, refetch, error } = useQuery<{
    pokemons: PokemonData[]
  }>(GET_POKEMONS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      langId: 12,
      limit: 21,
      offset: 0,
      search: '',
      types: typeList.map((type) => type.name)
    }
  })

  const handleSearch = () => {
    refetch({
      search: search
    })
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div className='mx-6 h-full font-zpix sm:mx-24 md:mx-36 lg:mx-48'>
      <header className='h-20 p-6 text-center text-4xl font-bold'>
        宝可梦图鉴 Next
      </header>
      <main className='sticky top-0 py-2'>
        <div className='flex w-full flex-col'>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant='bordered'
            size='lg'
            placeholder='输入宝可梦名称'
            labelPlacement='outside'
            classNames={{
              mainWrapper:
                'border-2 pixel-corners rounded-md border-theme hover:border-2',
              inputWrapper: 'border-none'
            }}
            startContent={
              <TbSearch className='text-2xl text-theme opacity-60' />
            }
            endContent={
              <button
                className='pixel-corners h-9 w-24 bg-sub-theme px-6 text-sm'
                onClick={handleSearch}
              >
                搜索
              </button>
            }
          />

          <div className='flex w-full justify-center gap-8 pt-4'>
            <div className=''>
              <TypeSelect onChange={() => {}} />
            </div>

            <button className='pixel-corners h-8 w-32 bg-sub-theme px-6'>
              随机一个
            </button>

            {/* <button className='pixel-corners h-8 w-32 bg-sub-theme px-6'>
              筛选排序
            </button>
            <button className='pixel-corners h-8 w-32 bg-sub-theme px-6'>
              随机一个
            </button> */}
          </div>
        </div>

        <div className='flex w-full flex-col pt-4'>
          {/* <div className='mr-4 w-1/4'>
            <div className='flex h-12 w-full items-center'>
              <Select
                items={typeList}
                onChange={(e) => {
                  console.log(9998888, e.target.value)
                }}
                aria-label='type'
                variant='bordered'
                placeholder='选择属性'
                selectionMode='multiple'
                classNames={{
                  mainWrapper:
                    'border-2 rounded-md border-theme hover:border-2',
                  trigger: 'border-none'
                }}
              >
                {(type) => (
                  <SelectItem
                    key={type.name}
                    textValue={type.name}
                    value={type.name}
                  >
                    <div className='flex items-center gap-2'>
                      <span>{type.name}</span>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </div>
          </div> */}
          <div className='w-full'>
            {/* <div className='flex h-12 items-center justify-between'>
              <div className='w-36'>
                <Select
                  variant='bordered'
                  className='max-w-xs'
                  aria-label='sorts'
                  classNames={{
                    mainWrapper: 'border-none shadow-none',
                    innerWrapper: 'shadow-none',
                    trigger: 'border-none shadow-none'
                  }}
                  selectedKeys={[sort]}
                  // value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  {sorts.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className='flex items-center'></div>
            </div> */}

            <div className='grid grid-cols-1 justify-between gap-6 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {data?.pokemons.map((item) => <PokemonCard data={item} />)}
            </div>

            {data?.pokemons.length > 0 && (
              <InView
                as='div'
                className='h-6'
                threshold={0}
                rootMargin='25px 0px'
                onChange={(inView) => {
                  if (inView) {
                    fetchMore({
                      variables: {
                        offset: data.pokemons.length
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev
                        return {
                          pokemons: [
                            ...prev.pokemons,
                            ...fetchMoreResult.pokemons
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
