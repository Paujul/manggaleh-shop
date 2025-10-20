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

export async function editProduct(
  id: string,
  payload: Partial<CreateProductPayload>
): Promise<Product | null> {
  const { data, error } = await supabase
    .from('product')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('product').delete().eq('id', id)

  if (error) throw error
}
