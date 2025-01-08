// app/upload/route.ts
import { type UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from '@/utils/env'

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME || '',
  api_key: CLOUDINARY_API_KEY || '',
  api_secret: CLOUDINARY_API_SECRET || '',
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Convert the file to a buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Wrap the callback in a Promise so we can await the result
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'Manggaleh',
            allowed_formats: ['jpg', 'jpeg', 'png'],
            // transformation: [{ width: 200, height: 192, crop: 'fill' }],
            // eager: [{ width: 200, height: 192, crop: 'fill' }],
          },
          (error, result) => {
            if (error) {
              reject(new Error(`Cloudinary upload failed: ${error.message}`))
            } else if (!result) {
              reject(new Error('Cloudinary upload returned no result'))
            } else {
              resolve(result)
            }
          }
        )
        // Pipe the buffer into the upload stream
        stream.end(buffer)
      }
    )

    // If we get here, uploadResult is the actual Cloudinary response
    return NextResponse.json({
      message: 'File uploaded successfully',
      fileUrl: uploadResult.secure_url, // Cloudinary file URL
    })
  } catch (error: unknown) {
    console.error('Error uploading file:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `File upload failed: ${errorMessage}` },
      { status: 500 }
    )
  }
}
