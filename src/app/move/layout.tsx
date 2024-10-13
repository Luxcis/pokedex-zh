import { PropsWithChildren } from 'react'
import AllMoveList from './move-list'

export default async function Page({ children }: PropsWithChildren) {
  return (
    <div className='relative flex h-full w-full overflow-hidden'>
      <AllMoveList className='w-full border-l border-l-muted  md:border-l-0 lg:w-1/3 ' />
      {children}
    </div>
  )
}
