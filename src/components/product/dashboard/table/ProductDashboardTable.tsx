import { useGetProductList } from '@/services/queries/useGetProduct'
import ProductTableSection from './section'
import ProductDashboardToolbar from './ProductDashboardToolbar'

// Ini ntar yg diisi compound component
function ProductDashboardTable() {
  const { data, isLoading } = useGetProductList()

  if (isLoading) return <span>Loading</span>
  return (
    <div className='bg-white rounded-lg w-full p-5 flex flex-col gap-5'>
      <ProductDashboardToolbar />

      <ProductTableSection products={data ?? []} />
    </div>
  )
}

export default ProductDashboardTable
