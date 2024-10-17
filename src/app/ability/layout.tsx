import { PropsWithChildren } from 'react'
import AllAbilityList from './ability-list'
import { AbilityList, PaginatedResponse } from '@/types'
import { fetchData } from '@/lib/fetch'

export default async function Page({ children }: PropsWithChildren) {
  const data = await fetchData<PaginatedResponse<AbilityList>>(
    'ability?page=0&pageSize=30'
  )

  return (
    <div className='relative flex h-full w-full overflow-hidden'>
      <AllAbilityList
        initialData={data.contents}
        className='w-full border-l border-l-muted md:border-l-0 lg:w-1/3 '
      />
      {children}
    </div>
  )
}
