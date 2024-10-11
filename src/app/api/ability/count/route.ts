import { readFile } from '@/lib/file'
import { AbilityList } from '@/types'
import { NextResponse } from 'next/server'

export async function GET() {
  const allData = await readFile<AbilityList>('ability_list.json')
  const total = allData.length
  return NextResponse.json(total)
}
