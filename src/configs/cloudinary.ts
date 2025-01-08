import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from '@/utils/env'

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME, // Your Cloudinary Cloud Name
  api_key: CLOUDINARY_API_KEY, // Your Cloudinary API Key
  api_secret: CLOUDINARY_API_SECRET, // Your Cloudinary API Secret
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Manggaleh', // Specify folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allow only specific file types
  },
})

export { cloudinary, storage }
