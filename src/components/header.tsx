import Image from 'next/image'
import { GithubLogo } from '@phosphor-icons/react/dist/ssr'
import LangSelect from './lang-select'

export function Header() {
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
        <h1 className='pl-3 font-medium'>pokedex.app</h1>
      </div>
      <div className='flex flex-shrink-0 items-center'>
        <LangSelect locale='en' />
      </div>
    </div>
  )
}
