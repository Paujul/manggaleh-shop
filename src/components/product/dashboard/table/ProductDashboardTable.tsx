import { useGetProductList } from '@/services/queries/useGetProduct'

import ProductDashboardToolbar from './ProductDashboardToolbar'
import ProductTableSection from './section'

// Ini ntar yg diisi compound component
function ProductDashboardTable() {
  const { data, isLoading } = useGetProductList()

  if (isLoading) return <span>Loading</span>
  return (
    <div className='flex w-full flex-col gap-5 rounded-lg bg-white p-5'>
      <ProductDashboardToolbar />

      <ProductTableSection products={data ?? []} />
    </div>
  )
}

export default ProductDashboardTable
