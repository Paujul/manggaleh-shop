import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Include related images in the query
    const products = await prisma.product.findMany({
      include: {
        image: true, // Include the related image object
      },
    })

    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Destructure input fields
    const { name, price, qty, image } = body
    console.log(body)

    // Validate required fields
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Name is required and must be a string' },
        { status: 400 }
      )
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Price is required and must be a positive number',
        },
        { status: 400 }
      )
    }
    if (
      !qty ||
      isNaN(Number(qty)) ||
      Number(qty) <= 0 ||
      !Number.isInteger(Number(qty))
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Quantity is required and must be a positive integer',
        },
        { status: 400 }
      )
    }
    if (!image || !image.url || !image.publicId || !image.filename) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image details (url, publicId, filename) are required',
        },
        { status: 400 }
      )
    }

    // Create a new product
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        qty: Number(qty),
        image: {
          create: {
            publicId: image.publicId,
            filename: image.filename,
            url: image.url,
          },
        },
      },
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
        error: 'An unexpected error occurred while creating the product',
      },
      { status: 500 }
    )
  }
}

// export async function PUT(req: NextRequest) {
//   try {
//     const body = await req.json()
//     const { id, name, price, qty, imgId } = body

//     if (!id || !name || !price || !qty) {
//       return NextResponse.json(
//         { success: false, error: 'All fields are required' },
//         { status: 400 }
//       )
//     }

//     const updatedProduct = await prisma.product.update({
//       where: { id },
//       data: { name, price: Number(price), qty: Number(qty), imgId },
//     })

//     return NextResponse.json({ success: true, product: updatedProduct })
//   } catch (error) {
//     console.error('Error updating product:', error)
//     return NextResponse.json(
//       { success: false, error: 'Failed to update product' },
//       { status: 500 }
//     )
//   }
// }

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      )
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
