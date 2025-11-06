import axios from 'axios'
import type { Dispatch, SetStateAction } from 'react'

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constants/env'

import type { UploadProgressState } from './handleImageUpload'

export async function handleImageDelete(
  oldPublicId: string | undefined,
  setUploadProgress: Dispatch<SetStateAction<UploadProgressState>>
) {
  try {
    if (oldPublicId) {
      setUploadProgress({ percent: 0, label: 'Replacing image...' })
      await axios.post(
        `${SUPABASE_URL}/functions/v1/delete-image`,
        { publicId: oldPublicId },
        {
          headers: {
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      )
    }
  } catch (err) {
    console.error(err)
    setUploadProgress({ percent: 0, label: 'Failed' })
  }
}
