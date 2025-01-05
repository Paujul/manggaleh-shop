const fetchData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` // Deployed environment
    : 'http://localhost:3000' // Local development

  const response = await fetch(`${baseUrl}/api/products`, {
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
