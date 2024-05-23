'use client'

import { TbLanguageHiragana } from 'react-icons/tb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/navigation'

interface Props {
  locale: string
}

function LangSwitch({ locale }: Props) {
  const t = useTranslations('Index')
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <TbLanguageHiragana className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-48'>
        {['en', 'zh-Hans'].map((lang, index) => (
          <DropdownMenuItem
            key={index}
            className='p-1 pb-1'
            onClick={() => {
              router.replace('/', { locale: lang })
            }}
          >
            {t(`lang.${lang}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LangSwitch
