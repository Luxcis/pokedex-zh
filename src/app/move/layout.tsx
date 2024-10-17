import { PropsWithChildren } from 'react'
import AllMoveList from './move-list'
import { fetchData } from '@/lib/fetch'
import { MoveList, PaginatedResponse } from '@/types'

export default async function Page({ children }: PropsWithChildren) {
  const data = await fetchData<PaginatedResponse<MoveList>>(
    'move?page=0&pageSize=30'
  )

  return (
    <div className='relative flex h-full w-full overflow-hidden'>
      <AllMoveList
        initialData={data.contents}
        className='w-full border-l border-l-muted  md:border-l-0 lg:w-1/3 '
      />
      {children}
    </div>
  )
}
