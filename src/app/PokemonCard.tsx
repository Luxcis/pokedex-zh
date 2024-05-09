import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { TYPES } from '@/lib/constants'

interface Props {
  no: number
  name: string
  types: { id: number; name: string; localName: string; color: string }[]
}
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork
// raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/394.png
export default function PokemonCard({ no, name, types }: Props) {
  return (
    <Link
      href={`/${no}`}
      as='div'
      className='flex h-[240px] w-[200px] cursor-pointer flex-col items-center rounded-xl bg-slate-50 p-4 hover:border-2'
    >
      <Image
        alt={name}
        width={140}
        height={140}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${no}.png`}
      />
      <span className='text-base'>{name}</span>
      <span className='text-base'>#{no}</span>
      <div className='mt-4 flex items-end justify-center gap-2'>
        {types.map((type) => {
          const color = TYPES.find((i) => i.id === type.id)?.color
          return (
            <span
              className='rounded-md px-2 py-1 text-sm capitalize'
              key={type.name}
              style={{
                background: color
              }}
            >
              {type.localName}
            </span>
          )
        })}
      </div>
    </Link>
  )
}
