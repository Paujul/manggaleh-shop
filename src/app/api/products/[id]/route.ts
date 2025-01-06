import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Product ID is required' },
      { status: 400 }
    )
  }

  try {
    const body = await request.json()
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: body,
    })

    return NextResponse.json(
      { success: true, product: updatedProduct },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json(
      { success: true, message: 'Product deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
