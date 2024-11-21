'use client'

import { TYPE_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Type } from '@/types'

interface Props {
  type: Type
  size: 'normal' | 'small'
  active?: boolean
  onClick?: (v: Type) => void
}

function TypeBadge({ type, size, active = true, onClick }: Props) {
  const color = TYPE_COLORS[type]

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center justify-center gap-2 rounded px-2 py-0.5',
        active ? 'text-white' : 'bg-muted text-muted-foreground'
      )}
      style={{
        backgroundColor: active ? color : ''
      }}
      onClick={() => onClick?.(type)}
    >
      {size === 'normal' && (
        <span className={cn('type', `type-${type}`)}></span>
      )}

      {size === 'normal' ? (
        <span className='w-8 text-sm '>{type}</span>
      ) : (
        <span className='text-xs brightness-200'>{type}</span>
      )}
    </div>
  )
}

export default TypeBadge
