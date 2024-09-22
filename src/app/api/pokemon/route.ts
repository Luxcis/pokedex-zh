import { NextResponse } from 'next/server'
import { PokemonList } from '@/types'
import { readFile } from '@/lib/file'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '0')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')
  const name = searchParams.get('name') || ''

  try {
    const allData = await readFile<PokemonList>('pokemon_full_list.json')
    const filteredData = allData.filter(
      (p) =>
        p.name.startsWith(name) ||
        p.name_en.toLowerCase().startsWith(name) ||
        p.name_jp.startsWith(name)
    )
    const total = filteredData.length

    const data = filteredData.splice(page * pageSize, pageSize)
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
