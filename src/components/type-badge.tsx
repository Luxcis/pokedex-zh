'use client'

import { TYPE_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Type } from '@/types'

interface Props {
  type: Type
  size: 'normal' | 'small'
}

function TypeBadge({ type, size }: Props) {
  const color = TYPE_COLORS[type]

  return (
    <div
      className='flex items-center justify-center gap-2 rounded px-2 py-0.5 text-white'
      style={{
        backgroundColor: color
      }}
    >
      {size === 'normal' && (
        <span className={cn('type', `type-${type}`)}></span>
      )}

      {size === 'normal' ? (
        <span className='text-sm'>{type}</span>
      ) : (
        <span className='text-xs brightness-200'>{type}</span>
      )}
    </div>
  )
}

export default TypeBadge
