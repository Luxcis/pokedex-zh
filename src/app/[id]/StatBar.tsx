'use client'

import { cn } from '@/lib/utils'
import { Stat } from '@/typings'

const colors: Record<Stat, string> = {
  hp: 'bg-red-500',
  attack: 'bg-orange-500',
  defense: 'bg-yellow-500',
  'special-attack': 'bg-green-500',
  'special-defense': 'bg-blue-500',
  speed: 'bg-purple-500'
}

interface Props {
  stat: Stat
  value: number
}

export default function StatBar({ value, stat }: Props) {
  const precent = (value / 255) * 100
  return (
    <div className='relative flex items-center'>
      <div className={cn('h-2 w-full rounded-full bg-gray-200')} />
      <div
        className={cn('absolute h-2 rounded-full', colors[stat])}
        style={{
          width: `${precent}%`
        }}
      />
      <span className='ml-2 font-bold text-gray-900 dark:text-gray-100'>
        {value}
      </span>
    </div>
  )
}
