export interface Product {
  id: number
  name: string
  rating?: number
  reviews?: number
  price: number
  qty?: number
  created_at: Date
}

export type CreateProductPayload = Omit<Product, 'id' | 'created_at'>
