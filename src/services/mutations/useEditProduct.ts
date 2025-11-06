import { useMutation, useQueryClient } from '@tanstack/react-query'

import { editProduct } from '../product'
import { getQueryKey } from '../queries/useGetProduct'

interface EditProductInput {
  id: string
  name?: string
  price?: number
  qty?: number
  imgUrl?: string
  imgPublicId?: string
  imgDeleteToken?: string
}

export function useEditProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: EditProductInput) => editProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() })
    },
  })
}
