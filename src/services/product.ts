import type { Product, CreateProductPayload } from '../types/product'
import supabase from '../utils/supabase'

export async function getProductList(): Promise<Product[]> {
  const { data, error } = await supabase.from('product').select()

  if (error) throw error
  return data ?? []
}

export async function createProduct(
  payload: CreateProductPayload
): Promise<Product | null> {
  const { data, error } = await supabase
    .from('product')
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data
}
