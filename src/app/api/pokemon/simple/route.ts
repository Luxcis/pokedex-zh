import { NextResponse } from 'next/server'
import { PokemonSimple } from '@/types'
import { readFile } from '@/lib/file'

export async function GET() {
  try {
    const data = await readFile<PokemonSimple[]>('pokemon_list.json')
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.error()
  }
}
