import axios from 'axios'

import { NEXT_PUBLIC_API_URL } from '@/utils/env'

export default axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
