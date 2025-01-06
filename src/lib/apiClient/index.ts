import { NEXT_PUBLIC_API_URL } from '@/utils/env'

export async function apiClient<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: Record<string, unknown>
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
  }

  const options: RequestInit = {
    method,
    headers,
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}${url}`, options)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Client Error:', error)
    throw error // Re-throw the error so it can be handled by the caller
  }
}
