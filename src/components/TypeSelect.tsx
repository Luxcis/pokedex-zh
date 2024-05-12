import { Select, SelectItem } from '@nextui-org/react'
import { typeList } from '@/lib/constants'

interface Props {
  onChange: (value: any) => void
}

export default function TypeSelect({ onChange }: Props) {
  return (
    <Select
      items={typeList}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      aria-label='type'
      variant='bordered'
      placeholder='选择属性'
      // selectionMode='multiple'
      scrollShadowProps={{
        isEnabled: false
      }}
      classNames={{
        mainWrapper: 'pixel-corners h-8 w-32 bg-sub-theme rounded-md',
        innerWrapper: 'h-8',
        trigger: 'border-none min-h-6',
        popoverContent: 'font-zpix px-1 rounded-none',
        listbox: 'p-0',
        listboxWrapper: 'p-0'
      }}
      // renderValue={}
    >
      {(type) => (
        <SelectItem
          key={type.name}
          className='px-2 py-1'
          textValue={type.name}
          value={type.name}
          style={{
            backgroundColor: type.color
          }}
        >
          <div className='flex items-center'>
            <span className='text-center'>{type.name}</span>
          </div>
        </SelectItem>
      )}
    </Select>
  )
}
