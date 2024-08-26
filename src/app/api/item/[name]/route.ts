import { parseTextToArray, parseTextToObject } from '@/lib/parse'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request, context: any) {
  const { params } = context

  const item = await prisma.item.findUnique({
    where: {
      name: params.name
    }
  })

  if (!item) {
    return {}
  }

  const result = {
    ...item,
    attributes: parseTextToArray(item['attributes']),
    sprites: parseTextToObject(item['sprites']),
    flavor_texts_local: parseTextToArray(item['flavor_texts_local']),
    flavor_texts_en: parseTextToArray(item['flavor_texts_en']),
    effect_entries_local: parseTextToArray(item['effect_entries_local']),
    effect_entries_en: parseTextToArray(item['effect_entries_en']),
    game_index: parseTextToArray(item['game_index']),
    held_by_pokemon: parseTextToArray(item['held_by_pokemon'])
  }

  return NextResponse.json(result)
}
