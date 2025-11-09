import axios from 'axios'
import type { Dispatch, SetStateAction } from 'react'

import { CLOUDINARY_CLOUD_NAME } from '@/constants/env'

export type UploadProgressState = {
  percent: number
  label: string
}

export async function handleImageUpload(
  file: File | undefined,
  setUploadProgress: Dispatch<SetStateAction<UploadProgressState>>
) {
  if (!file) return undefined

  const imageFormData = new FormData()
  imageFormData.append('upload_preset', 'manggaleh')
  imageFormData.append('tags', 'browser_upload')
  imageFormData.append('file', file)

  setUploadProgress({ percent: 0, label: '0%' })

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      imageFormData,
      {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent

          if (!total) {
            setUploadProgress({ percent: 0, label: `loaded ${loaded} bytes` })
            return
          }

          const percent = Math.round((loaded * 100) / total)

          if (percent >= 100) {
            setUploadProgress({ percent: 100, label: 'Processing...' })
            return
          }

          setUploadProgress({ percent, label: `${percent}%` })
        },
      }
    )

    setUploadProgress({ percent: 100, label: 'Processing...' })

    return {
      url: res.data.secure_url,
      publicId: res.data.public_id,
      deleteToken: res.data.delete_token,
    }
  } catch (error) {
    setUploadProgress({ percent: 0, label: 'Submit' })
    throw error
  }
}
