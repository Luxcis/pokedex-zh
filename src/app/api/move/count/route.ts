import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const total = await prisma.move.count()
  return NextResponse.json(total)
}
