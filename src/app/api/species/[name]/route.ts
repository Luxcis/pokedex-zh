import { parseTextToArray, parseTextToObject } from '@/lib/parse'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request, context: any) {
  const { params } = context
  const species = await prisma.species.findUnique({
    where: {
      name: params.name
    }
  })

  if (!species) {
    return {}
  }

  const varieties = parseTextToArray(species['varieties']) as any[]
  const names = varieties.map((variety) => variety['pokemon'])
  const pokemons = await getPokemons(names)

  const result = {
    ...species,
    egg_groups: parseTextToArray(species['egg_groups']),
    flavor_texts_local: parseTextToArray(species['flavor_texts_local']),
    flavor_texts_en: parseTextToArray(species['flavor_texts_en']),
    pokedex_numbers: parseTextToArray(species['pokedex_numbers']),
    pal_park_encounters: parseTextToArray(species['pal_park_encounters']),
    varieties: pokemons
  }

  return NextResponse.json(result)
}

async function getPokemons(names: string[]) {
  const pokemons = await prisma.pokemon.findMany({
    where: {
      OR: names.map((name) => ({
        name
      }))
    }
  })

  const result = await Promise.all(
    pokemons.map(async (pokemon) => {
      const form_names = parseTextToArray(pokemon['forms'])
      const forms = await getPokemonForms(form_names)

      return {
        ...pokemon,
        abilities: parseTextToArray(pokemon['abilities']),
        types: parseTextToArray(pokemon['types']),
        forms: forms,
        stats: parseTextToArray(pokemon['stats']),
        cries: parseTextToObject(pokemon['cries']),
        game_indices: parseTextToArray(pokemon['game_indices']),
        held_items: parseTextToArray(pokemon['held_items']),
        sprites: parseTextToObject(pokemon['sprites']),
        moves: parseTextToArray(pokemon['moves'])
      }
    })
  )
  return result
}

async function getPokemonForms(names: string[]) {
  const forms = await prisma.pokemon_form.findMany({
    where: {
      OR: names.map((name) => ({
        name
      }))
    }
  })

  const result = forms.map((form) => {
    return {
      ...form,
      types: parseTextToArray(form['types']),
      sprites: parseTextToObject(form['sprites'])
    }
  })
  return result
}
