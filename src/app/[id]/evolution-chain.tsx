import Image from 'next/image'
import { artworkUrl } from '@/lib/constants'
import { Link } from 'next-view-transitions'

interface Props {
  data: { name: string; id: number }[]
}

export default function EvolutionChain({ data }: Props) {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {data.map((item) => (
        <Link
          href={`/${item.id}`}
          key={item.id}
          className='flex flex-col items-center rounded-lg bg-gray-100 p-4 hover:bg-gray-200 dark:bg-gray-800'
        >
          <Image
            alt={item.name}
            className='mb-2 cursor-pointer rounded-full'
            height='100'
            src={`${artworkUrl}${item.id}.png`}
            style={{
              aspectRatio: '100/100',
              objectFit: 'cover'
            }}
            width='100'
          />
          <p className=' font-bold text-gray-900 dark:text-gray-100'>
            {item.name}
          </p>
        </Link>
      ))}
    </div>
  )
}
