import { NEXT_PUBLIC_API_URL } from '@/utils/env'

export async function GET() {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/products`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()

  return Response.json({ data })
}
