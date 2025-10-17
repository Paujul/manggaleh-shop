import type { Product } from '@/types/product'
import { ProductTable } from './Header'
import { Row } from './Row'

type ProductProps = {
  products: Product[]
}

function ProductTableSection({ products }: ProductProps) {
  return (
    <div className='text-[#434343]'>
      <ProductTable.Header />

      {products.map((product: Product) => (
        <Row key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductTableSection
