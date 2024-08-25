import { AbilitySimple, PaginatedResponse } from '@/types'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')
  const name = searchParams.get('name') || ''

  const skip = (page - 1) * pageSize
  const take = pageSize

  const items = await prisma.ability.findMany({
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
      ]
    },
    select: {
      id: true,
      name: true,
      name_local: true,
      name_en: true
    }
  })

  const total = await prisma.ability.count({
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
      ]
    }
  })

  const result: PaginatedResponse<AbilitySimple> = {
    page,
    pageSize,
    total,
    result: items
  }

  return NextResponse.json(result)
}
