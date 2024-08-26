import { PaginatedResponse, SpeciesSimple } from '@/types'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '0')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')
  const name = searchParams.get('name') || ''
  const generation = searchParams.get('generation') || ''
  const type = searchParams.get('type') || ''

  const skip = page * pageSize
  const take = pageSize

  const species = await prisma.species.findMany({
    skip,
    take,
    where: {
      OR: [
        {
          name_en: {
            startsWith: name
          }
        },
        {
          name_local: {
            contains: name
          }
        }
      ],
      generation: generation !== '' ? generation : undefined
    },
    select: {
      id: true,
      name: true,
      name_local: true,
      name_en: true,
      sprite_home: true
    }
  })

  const total = await prisma.species.count({
    where: {
      OR: [
        {
          name_en: {
            startsWith: name
          }
        },
        {
          name_local: {
            contains: name
          }
        }
      ],
      generation: generation !== '' ? generation : undefined
    }
  })

  const result: PaginatedResponse<SpeciesSimple> = {
    page,
    pageSize,
    total,
    result: species
  }

  return NextResponse.json(result)
}
