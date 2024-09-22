import { findFile, readFile } from '@/lib/file'
import { PokemonDetail } from '@/types'
import { NextResponse } from 'next/server'

export async function GET(request: Request, context: any) {
  const { params } = context
  const name = params.name

  try {
    const file = await findFile(name, 'pokemon')
    if (file) {
      const data = await readFile<PokemonDetail>(`pokemon/${file}`)
      return NextResponse.json(data)
    }
    return NextResponse.json(null)
  } catch (error) {
    return NextResponse.error()
  }
}
