import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { typeList } from '@/lib/constants'
import { PokemonData } from '@/types'
import TypeBadge from '@/components/type-badge'

interface Props {
  data: PokemonData
}
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork
// raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/394.png
export default function PokemonCard({ data }: Props) {
  // console.log('Pokemon', data.types)

  return (
    <Link
      href={`/${data.id}`}
      as='div'
      className='group flex h-[200px] min-w-[160px] max-w-[180px] cursor-pointer flex-col border-opacity-40 bg-slate-50 px-4 py-2 duration-300'
    >
      {/* <Image
        alt={data.name}
        width={100}
        height={100}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
      /> */}
      <div className='flex h-24 w-full items-center justify-center'>
        <img
          className='block group-hover:hidden'
          style={{
            width: 96,
            height: 96
          }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
        />
        <img
          className='hidden group-hover:block'
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            objectFit: 'contain',
            imageRendering: 'pixelated',
            maxWidth: '350px',
            maxHeight: '22vh'
          }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif`}
        />
      </div>

      <span className='text-left text-base font-bold'>
        {data.specy.names[0].name}
      </span>
      <span className='text-xs opacity-70'>#{data.id}</span>
      <div className='mt-2 flex items-end gap-2'>
        {data.types?.map((item) => (
          <TypeBadge key={item.type_id} data={item} />
        ))}
      </div>
    </Link>
  )
}
