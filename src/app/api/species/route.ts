import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')
  const generation = searchParams.get('generation') || ''
  const type = searchParams.get('type') || ''

  const skip = (page - 1) * pageSize
  const take = pageSize

  const species = await prisma.species.findMany({
    skip,
    take,
    where: {},
    select: {
      id: true,
      name: true,
      name_local: true,
      name_en: true,
      sprite_default: true,
      sprite_home: true
    }
  })

  return NextResponse.json(species)
}
