import { NextApiRequest, NextApiResponse } from 'next'

export type Controller = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>

// src/types/api.ts

// Type for the Post model (matches Prisma schema)
export interface Catalog {
  id: number
  name: string
  price: number
  qty: number
  imgId: string
}

// Type for the API response
export interface CatalogResponse {
  success: boolean
  posts?: Catalog
  error?: string
}

// Type for fetching multiple posts
export interface CatalogsResponse {
  success: boolean
  products?: Catalog[]
  error?: string
}
