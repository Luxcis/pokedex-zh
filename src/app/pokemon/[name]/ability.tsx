import { FormAbility } from '@/types'

export default function Ability({ name, is_hidden, text }: FormAbility) {
  return (
    <div className='flex w-full max-w-xs cursor-pointer flex-col items-center gap-1 rounded-lg bg-gray-100 px-2 py-2 dark:bg-gray-800 md:w-3/4 lg:px-4'>
      <p>
        <span className='text-sm'>{name}</span>
        <span className='text-xs'>{is_hidden ? '（隐藏）' : ''}</span>
      </p>
      <p className='text-xs text-muted-foreground'>{text}</p>
    </div>
  )
}
