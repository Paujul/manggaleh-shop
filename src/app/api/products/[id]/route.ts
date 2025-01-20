import { PrismaClient } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'

import { cloudinary } from '@/configs/cloudinary'

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
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    console.log(params, 'params')
    // console.log(req, 'request')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Fetch the product to get its imgId
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { image: true },
    })
    console.log(product, 'asd')

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Delete the product image from Cloudinary
    if (product.image?.publicId) {
      await cloudinary.uploader.destroy(product.image?.publicId)
      console.log('Image deleted from Cloudinary')
    } else {
      console.log('No image to delete', product)
    }

    // Delete the product from the database
    await prisma.product.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({
      success: true,
      message: 'Product and image deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
