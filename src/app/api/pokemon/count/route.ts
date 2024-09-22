import { readFile } from '@/lib/file'
import { PokemonList } from '@/types'
import { NextResponse } from 'next/server'

export async function GET() {
  const allData = await readFile<PokemonList>('pokemon_list.json')
  const total = allData.length
  return NextResponse.json(total)
}
