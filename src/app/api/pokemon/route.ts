import { NextResponse } from 'next/server'
import { Order, PokemonList, Type } from '@/types'
import { readFile } from '@/lib/file'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '0')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')
  const name = searchParams.get('name') || ''
  const type1 = searchParams.get('type1') || ''
  const type2 = searchParams.get('type2') || ''
  const generation = searchParams.get('generation') || ''
  const order = (searchParams.get('order') || 'asc') as Order

  try {
    const allData = await readFile<PokemonList>('pokemon_full_list.json')
    const filteredData = allData
      .filter(
        (p) =>
          p.name.startsWith(name) ||
          p.name_en.toLowerCase().startsWith(name) ||
          p.name_jp.startsWith(name)
      )
      .filter((p) => {
        if (generation) {
          return p.generation === generation
        }
        return true
      })
      .filter((p) => {
        if (type1 && type2) {
          return (
            p.types.includes(type1 as Type) && p.types.includes(type2 as Type)
          )
        }
        if (type1) {
          return p.types.includes(type1 as Type)
        }
        return true
      })

    const orderedData = order === 'desc' ? filteredData.reverse() : filteredData
    const total = orderedData.length

    const data = orderedData.splice(page * pageSize, pageSize)
    return NextResponse.json({
      total: total,
      page: page,
      pageSize: pageSize,
      contents: data
    })
  } catch (error) {
    return NextResponse.error()
  }
}
