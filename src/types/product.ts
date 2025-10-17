export interface Product {
  id: number
  name: string
  rating?: number
  reviews?: number
  price: number
  qty?: number
  imgUrl?: string
  created_at: Date
}

export type CreateProductPayload = Omit<Product, 'id' | 'created_at'>
