import { readFile } from '@/lib/file'
import { MoveList } from '@/types'
import { NextResponse } from 'next/server'

export async function GET() {
  const allData = await readFile<MoveList>('move_list.json')
  const total = allData.length
  return NextResponse.json(total)
}
