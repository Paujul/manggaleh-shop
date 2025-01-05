import { type FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import fetchData from '@/lib/products'
import { setProducts } from '@/reducers/productSlice'
import { Catalog } from '@/types/api'

import CatalogCard from './CatalogCard'

const Catalogs: FC = () => {
  const productData = useSelector(
    (state: { products: { products: Catalog[] } }) => state.products.products
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchData()
        dispatch(setProducts(data.products))
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    fetchProducts()
  }, [dispatch])
  // console.log(productData.products)
  return (
    <div className='mt-[78px]'>
      <div className='container mx-auto flex w-3/5 flex-row flex-wrap items-center justify-around rounded-lg bg-gray-100 p-2'>
        {productData &&
          productData?.map((product: Catalog, index: number) => (
            <CatalogCard key={product.id} product={product} index={index} />
          ))}
      </div>
    </div>
  )
}

export default Catalogs
