import Image from 'next/image'
import { DotsThreeOutline, GithubLogo } from '@phosphor-icons/react/dist/ssr'
import { Button } from './ui/button'
import { getTranslations } from 'next-intl/server'
import MobileSidebar from './mobile-sidebar'

export async function Header() {
  const t = await getTranslations('index')
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
      <div className='flex flex-shrink-0 items-center gap-2'>
        <Button className='rounded-full' variant='outline' size='icon'>
          <GithubLogo size={16} />
        </Button>
        <MobileSidebar>
          <Button
            className='flex rounded-full md:hidden'
            variant='outline'
            size='icon'
          >
            <DotsThreeOutline size={16} />
          </Button>
        </MobileSidebar>
      </div>
    </div>
  )
}
