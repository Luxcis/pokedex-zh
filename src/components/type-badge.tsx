import { typeList } from '@/lib/constants'
import { Type } from '@/typings'

interface Props {
  value: Type
}

export default function TypeBadge({ value }: Props) {
  const color = typeList.find((i) => i.id === value.type_id)?.color

  return (
    <span
      className='mr-2 min-w-12 rounded-full px-3 py-1 text-center text-sm text-white'
      style={{
        background: color
      }}
    >
      {value.type.local_names[0].name}
    </span>
  )
}
