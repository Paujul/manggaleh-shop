import axios from 'axios'
import {
  handleImageUpload,
  type UploadProgressState,
} from './handleImageUpload'
import type { Dispatch, SetStateAction } from 'react'
import { CLOUDINARY_CLOUD_NAME } from '@/constants/env'

export async function handleImageDelete(
  oldPublicId: string | undefined,
  deleteToken: string,
  newFile: File | undefined,
  setUploadProgress: Dispatch<SetStateAction<UploadProgressState>>
) {
  try {
    // hapus lama dulu kalo ada
    if (oldPublicId) {
      setUploadProgress({ percent: 0, label: 'Replacing image...' })
      await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/delete_by_token`,
        { public_id: oldPublicId, token: deleteToken }
      )
    }

    return await handleImageUpload(newFile, setUploadProgress)
  } catch (err) {
    console.error(err)
    setUploadProgress({ percent: 0, label: 'Failed' })
  }
}
