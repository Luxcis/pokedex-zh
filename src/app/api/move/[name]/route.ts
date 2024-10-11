import { findFile, readFile } from '@/lib/file'
import { MoveDetail } from '@/types'
import { NextResponse } from 'next/server'

export async function GET(request: Request, context: any) {
  const { params } = context
  const name = params.name

  try {
    const file = await findFile(name, 'move')
    if (file) {
      const data = await readFile<MoveDetail>(`move/${file}`)
      return NextResponse.json(data)
    }
    return NextResponse.json(null)
  } catch (error) {
    return NextResponse.error()
  }
}
