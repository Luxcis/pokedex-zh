import { PaginatedResponse, PokemonSimple, SpeciesSimple } from '@/types'
import { parseTextToArray } from '@/utils/parse'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')
  const name = searchParams.get('name') || ''
  const generation = searchParams.get('generation') || ''
  const type = searchParams.get('type') || ''

  const skip = (page - 1) * pageSize
  const take = pageSize

  const pokemons = await prisma.pokemon.findMany({
    skip,
    take,
    select: {
      id: true,
      name: true,
      types: true,
      species: true
    }
  })

  const total = await prisma.pokemon.count()

  const data: PokemonSimple[] = pokemons.map((pokemon) => ({
    ...pokemon,
    types: parseTextToArray(pokemon.types)
  }))

  const result: PaginatedResponse<PokemonSimple> = {
    page,
    pageSize,
    total,
    result: data
  }

  return NextResponse.json(result)
}

async function getSpecies(name: string) {
  return await prisma.species.findUnique({
    where: {
      name: name
    }
  })
}
