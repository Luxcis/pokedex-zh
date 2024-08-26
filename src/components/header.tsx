import Image from 'next/image'
import { GithubLogo } from '@phosphor-icons/react/dist/ssr'
import { Button } from './ui/button'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

export function Header() {
  const t = useTranslations('index')
  return (
    <div className='flex items-center justify-between bg-white px-7 py-3.5 dark:bg-neutral-950 sm:flex-row sm:items-center sm:space-y-0 md:h-16'>
      <div className='flex flex-shrink-0 items-center'>
        <Image
          width={36}
          height={36}
          className='h-9 w-auto'
          src='/favicon.png'
          alt='pokemon.app logo'
        />
        <h1 className='pl-3 font-medium'>{t('title')}</h1>
      </div>
      <div className='flex flex-shrink-0 items-center'>
        <Button variant='outline' size='icon'>
          <GithubLogo size={18} />
        </Button>
      </div>
    </div>
  )
}
