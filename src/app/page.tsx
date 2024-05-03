'use client'

import { Link } from 'next-view-transitions'
import useSWR from 'swr'

const getPokemons = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon-species')
  if (!res.ok) {
    throw new Error(`Could not fetch data`)
  }
  const data = await res.json()

  return data
}

export default function Home() {
  const { data, isLoading } = useSWR('pokemon-species', getPokemons)

  console.log('data', data)

  return (
    <div className='font-zpix mx-28 h-full text-4xl font-extrabold'>
      <header className='p-4'>POKEDEX-NEXT</header>

      <main>
        <h2>
          This is the <span className='demo'>Demo</span>
        </h2>
        <Link href='/demo'>Go to /demo</Link>
      </main>
    </div>
  )
}
