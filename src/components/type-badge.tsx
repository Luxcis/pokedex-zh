import { typeList } from '@/lib/constants'
import { TypeResult } from '@/types'

interface Props {
  data: TypeResult
}

export default function TypeBadge({ data }: Props) {
  const color = typeList.find((i) => i.id === data.type_id)?.color

  return (
    <div
      className='flex h-6 min-w-12 items-center justify-center text-xs text-[#e3e3e6]'
      style={{
        background: color
      }}
    >
      {data.type.localNames[0].name}
    </div>
  )
}
