import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

import cloudinary from './cloudinary'

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Manggaleh', // Specify folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allow only specific file types
  },
})

const upload = multer({ storage })

export default upload
