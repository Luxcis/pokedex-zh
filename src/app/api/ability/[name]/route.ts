import { findFile, readFile } from '@/lib/file'
import { AbilityDetail } from '@/types'
import { NextResponse } from 'next/server'

export async function GET(request: Request, context: any) {
  const { params } = context
  const name = params.name

  try {
    const file = await findFile(name, 'ability')
    if (file) {
      const data = await readFile<AbilityDetail>(`ability/${file}`)
      return NextResponse.json(data)
    }
    return NextResponse.json(null)
  } catch (error) {
    return NextResponse.error()
  }
}
