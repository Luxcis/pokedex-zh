import { parseTextToArray, parseTextToObject } from '@/utils/parse'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request, context: any) {
  const { params } = context

  const item = await prisma.move.findUnique({
    where: {
      name: params.name
    }
  })

  if (!item) {
    return {}
  }

  const result = {
    ...item,
    contest_combos: parseTextToObject(item['contest_combos']),
    meta: parseTextToObject(item['meta']),
    machines: parseTextToObject(item['machines']),
    flavor_texts_local: parseTextToArray(item['flavor_texts_local']),
    flavor_texts_en: parseTextToArray(item['flavor_texts_en']),
    effect_entries_local: parseTextToArray(item['effect_entries_local']),
    effect_entries_en: parseTextToArray(item['effect_entries_en']),
    learned_by_pokemon: parseTextToArray(item['learned_by_pokemon'])
  }

  return NextResponse.json(result)
}
