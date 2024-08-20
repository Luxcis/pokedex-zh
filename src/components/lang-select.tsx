'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

interface Props {
  locale: string
}

export default function LangSelect({ locale }: Props) {
  return (
    <Select value={locale} onValueChange={(value: string) => {}}>
      <SelectTrigger className='h-7 w-[145px] text-xs [&_svg]:h-4 [&_svg]:w-4'>
        <span className='text-muted-foreground'>Language: </span>
        <SelectValue placeholder='Select language' />
      </SelectTrigger>
      <SelectContent>
        {['en', 'zh-Hans'].map((lang) => (
          <SelectItem key={lang} value={lang} className='text-xs'>
            {lang}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
