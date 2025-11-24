export interface Product {
  id: string
  name: string
  rating?: number
  reviews?: number
  price: number
  qty?: number
  imgUrl?: string
  imgPublicId: string
  imgDeleteToken: string
  desc?: string
  created_at: Date
}

export type CreateProductPayload = Omit<Product, 'id' | 'created_at'>
