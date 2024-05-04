'use client'

import { GET_POKEMONS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { InView } from 'react-intersection-observer'
import { useState } from 'react'
import PokemonCard from './PokemonCard'

interface Pokemon {
  no: number
  name: string
  localName: string
  flavorText: string
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  // const [page, setPage] = useState(0)
  const { data, loading, fetchMore, error, variables } = useQuery(
    GET_POKEMONS,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        langId: 12,
        limit: 12,
        offset: 0
      },
      onCompleted: (data) => {
        const originalData = data.pokemon_v2_pokemon as any[]
        const pokemons = originalData.map((item) => {
          console.log(
            888776666,
            item.id,
            item.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0],
            item.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts
          )
          return {
            no: item.id,
            name: item.name,
            flavorText:
              item.pokemon_v2_pokemonspecy
                .pokemon_v2_pokemonspeciesflavortexts[0]?.flavor_text,
            localName:
              item.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0]
                .name
          }
        })

        console.log('complete', data)
        setPokemons(pokemons)

        // setPokemons((prev) => {
        //   return [...prev, ...pokemons]
        // })
      }
    }
  )
  console.log('data', pokemons)

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div className='font-zpix mx-28 h-full text-4xl font-extrabold'>
      <header className='p-4'>POKEDEX-NEXT</header>
      <main>
        <div className='grid grid-cols-3 gap-6'>
          {pokemons.map((item) => (
            <PokemonCard
              key={item.no}
              no={item.no}
              types={[]}
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

                    console.log('update query', prev, fetchMoreResult)
                    return {
                      pokemon_v2_pokemon: [
                        ...prev.pokemon_v2_pokemon,
                        ...fetchMoreResult.pokemon_v2_pokemon
                      ]
                    }
                  }
                })
                // console.log('res page', page)
              }
            }}
          ></InView>
        )}
      </main>
    </div>
  )
}
