import axios from 'axios'

import { SUPABASE_ROLE_KEY, SUPABASE_URL } from '@/constants/env'

export default axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1/product`,
  headers: {
    apiKey: SUPABASE_ROLE_KEY,
    Authorization: SUPABASE_ROLE_KEY,
  },
})
