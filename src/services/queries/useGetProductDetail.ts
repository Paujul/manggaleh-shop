import { useQuery } from '@tanstack/react-query'

import { getProductDetail } from '../product'

export function getQueryKey(id: string) {
  return ['product', id]
}

export function useGetProductDetail(id: string) {
  return useQuery({
    queryKey: getQueryKey(id),
    queryFn: () => getProductDetail(id),
  })
}
