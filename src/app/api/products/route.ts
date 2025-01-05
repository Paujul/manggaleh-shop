import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

import { parseRequestBody } from '@/utils/parseRequestBody'

// Adjust path as needed

type ProductCreateInput = {
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

// PUT /api/products/:id - Update a product by ID
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing product ID' },
        { status: 400 }
      )
    }

    const body = await parseRequestBody(request)
    const { name, price, qty, imgId } = body as ProductCreateInput

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, price, qty, imgId },
    })

    return NextResponse.json(
      { success: true, product: updatedProduct },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

// DELETE /api/products/:id - Delete a product by ID
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing product ID' },
        { status: 400 }
      )
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({ success: true }, { status: 204 })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
