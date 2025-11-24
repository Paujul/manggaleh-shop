import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteProduct } from '../product'
import { getQueryKey } from '../queries/useGetProduct'

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() })
    },
  })
}
