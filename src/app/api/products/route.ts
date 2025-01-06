import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

import { parseRequestBody } from '@/utils/parseRequestBody'

// Adjust path as needed

export type ProductCreateInput = {
  name: string
  price: number
  qty: number
  imgId: string
}

const prisma = new PrismaClient()

// GET /api/products - Fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json({ success: true, products }, { status: 200 })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    const body = await parseRequestBody(request)
    const { name, price, qty, imgId } = body as ProductCreateInput

    const newProduct = await prisma.product.create({
      data: { name, price, qty, imgId },
    })

    return NextResponse.json(
      { success: true, product: newProduct },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
