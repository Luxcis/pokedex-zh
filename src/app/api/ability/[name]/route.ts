import { parseTextToArray } from '@/lib/parse'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request, context: any) {
  const { params } = context

  const item = await prisma.ability.findUnique({
    where: {
      name: params.name
    }
  })

  if (!item) {
    return {}
  }

  const result = {
    ...item,
    flavor_texts_local: parseTextToArray(item['flavor_texts_local']),
    flavor_texts_en: parseTextToArray(item['flavor_texts_en']),
    effect_entries_local: parseTextToArray(item['effect_entries_local']),
    effect_entries_en: parseTextToArray(item['effect_entries_en']),
    pokemon: parseTextToArray(item['pokemon'])
  }

  return NextResponse.json(result)
}
