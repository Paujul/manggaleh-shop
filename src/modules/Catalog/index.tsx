import { type FC, memo, useEffect, useMemo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import Skeleton from '@/components/layout/Skeleton'
import fetchData from '@/lib/products'
import { setProducts } from '@/reducers/productSlice'
import type { Catalog } from '@/types/api'

import CatalogCard from './CatalogCard'

const Catalogs: FC = () => {
  const dispatch = useDispatch()
  const productData = useSelector(
    (state: { products: { products: Catalog[] } }) => state.products.products,
    shallowEqual
  )

  useEffect(() => {
    const fetchProducts = async () => {
      if (productData.length === 0) {
        try {
          const data = await fetchData()
          dispatch(setProducts(data.products))
        } catch (error) {
          console.error('Failed to fetch products:', error)
        }
      }
    }

    fetchProducts()
  }, [dispatch, productData.length])

  const skeletons = useMemo(
    () =>
      Array.from({ length: 15 }).map((_, index) => (
        <Skeleton key={index} className='card my-5 h-[332px]' />
      )),
    []
  )

  const renderedProducts = useMemo(
    () =>
      productData.map((product: Catalog) => (
        <CatalogCard key={product.id} product={product} />
      )),
    [productData]
  )

  // const renderedProducts = productData.map((product: Catalog) => (
  //   <CatalogCard key={product.id} product={product} />
  // ))

  console.log(productData)

  return (
    <div className='mt-5'>
      <div className='container mx-auto flex w-full flex-row flex-wrap items-center justify-around gap-5 rounded-lg bg-gray-100 p-2'>
        {productData.length === 0 ? skeletons : renderedProducts}
      </div>
    </div>
  )
}

export default memo(Catalogs) // Memoize the component
