import { NextResponse } from 'next/server'
import { AbilityList, Order } from '@/types'
import { readFile } from '@/lib/file'
import { cache } from '@/lib/cache'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '0')
  const pageSize = parseInt(searchParams.get('pageSize') || '50')
  const name = searchParams.get('name') || ''
  const generation = searchParams.get('generation') || ''
  const order = (searchParams.get('order') || 'asc') as Order

  try {
    const allData = await readFile<AbilityList>('ability_list.json')
    const filteredData = allData
      .filter(
        (p) =>
          p.name.includes(name) ||
          p.name_en.toLowerCase().startsWith(name) ||
          p.name_jp.startsWith(name)
      )
      .filter((p) => {
        if (generation) {
          return p.generation === generation
        }
        return true
      })

    const orderedData = order === 'desc' ? filteredData.reverse() : filteredData
    const total = orderedData.length

    const data = orderedData.splice(page * pageSize, pageSize)
    const res = NextResponse.json({
      total: total,
      page: page,
      pageSize: pageSize,
      contents: data
    })
    cache(res)
    return res
  } catch (error) {
    return NextResponse.error()
  }
}
