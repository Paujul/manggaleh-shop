import { NEXT_PUBLIC_API_URL } from '@/utils/env'

const fetchData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
    ? `${NEXT_PUBLIC_API_URL}` // Deployed environment
    : 'http://localhost:3000' // Local development

  const response = await fetch(`${baseUrl}/products`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

export default fetchData
