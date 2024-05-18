import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { typeList } from '@/lib/constants'
import { PokemonData } from '@/typings'
import TypeBadge from '@/components/type-badge'
import { toIndexString } from '@/lib/utils'

interface Props {
  data: PokemonData
}
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork
// raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/394.png
export default function PokemonCard({ data }: Props) {
  return (
    <div className='group relative'>
      <div className='overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-950'>
        <Link
          href={`/${data.id}`}
          className='flex w-full cursor-pointer justify-center'
        >
          <Image
            alt={data.name}
            className='aspect-square object-cover transition-opacity group-hover:opacity-50'
            height={250}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
            width={250}
          />
        </Link>

        <div className='space-y-2 p-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold'>
              {data.specy.names[0].name}
            </h3>
            <span className='rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200'>
              {toIndexString(data.id)}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            {data.types.map((type) => (
              <TypeBadge key={type.type_id} value={type} />
            ))}
          </div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            The famous electric mouse Pokemon, known for its lightning bolt tail
            and cheeks that can store electricity.
          </p>
        </div>
      </div>
    </div>
  )
}
