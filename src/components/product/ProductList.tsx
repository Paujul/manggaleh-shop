import type { Product } from '@/types/product'
import { useGetProductList } from '@/services/queries/useGetProduct'
import ProductCard from './ProductCard'

function ProductList() {
  const { data, isLoading } = useGetProductList()

  if (isLoading) return <div className=''>Loading</div>

  return (
    <div
      className='grid justify-between gap-1.5 gap-y-5 xl:gap-4 2xl:gap-5 py-10
    [grid-template-columns:repeat(auto-fit,_minmax(200px,_200px))]'
    >
      {data?.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
export default ProductList
