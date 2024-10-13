import { PropsWithChildren } from 'react'
import AllAbilityList from './ability-list'

export default async function Page({ children }: PropsWithChildren) {
  return (
    <div className='relative flex h-full w-full overflow-hidden'>
      <AllAbilityList className='w-full border-l border-l-muted  md:border-l-0 lg:w-1/3 ' />
      {children}
    </div>
  )
}
