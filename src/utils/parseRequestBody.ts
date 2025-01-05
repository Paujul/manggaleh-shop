export async function parseRequestBody(
  request: Request
): Promise<Record<string, string | number>> {
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const text = await request.text()
    const params = new URLSearchParams(text)
    const parsed: Record<string, string | number> = {}
    for (const [key, value] of params.entries()) {
      parsed[key] = isNaN(Number(value)) ? value : Number(value)
    }
    return parsed
  }

  if (contentType.includes('application/json')) {
    return await request.json()
  }

  throw new Error('Unsupported Content-Type')
}
