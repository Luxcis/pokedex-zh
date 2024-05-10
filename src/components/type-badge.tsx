import { typeList } from '@/lib/constants'
import { TypeResult } from '@/types'
import { Chip } from '@nextui-org/chip'

interface Props {
  data: TypeResult
}

export default function TypeBadge({ data }: Props) {
  const color = typeList.find((i) => i.id === data.type_id)?.color

  return (
    <Chip
      className='h-6 min-w-12 text-xs'
      style={{
        background: color
      }}
    >
      {data.type.localNames[0].name}
    </Chip>
  )
}
