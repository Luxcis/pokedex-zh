'use client'

import { TYPE_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Type } from '@/types'
import { useTranslations } from 'next-intl'

interface Props {
  type: Type
}

function TypeBadge({ type }: Props) {
  const color = TYPE_COLORS[type]
  const t = useTranslations('index.type')

  return (
    <div
      className='flex items-center gap-2 rounded px-2 py-0.5 text-white'
      style={{
        backgroundColor: TYPE_COLORS[type]
      }}
    >
      {['unknown', 'shadow'].includes(type) ? null : (
        <span className={cn('type', `type-${type}`)}></span>
      )}
      <span className='text-sm'>{t(type)}</span>
    </div>
  )
}

export default TypeBadge
