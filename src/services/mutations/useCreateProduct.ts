import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '../product'
import { getQueryKey } from '../queries/useGetProduct'

interface CreateProductInput {
  name: string
  price: number
  qty: number
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateProductInput) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() })
    },
  })
}
