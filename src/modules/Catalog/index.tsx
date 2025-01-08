import { type FC, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Skeleton from '@/components/layout/Skeleton'
import fetchData from '@/lib/products'
import { setProducts } from '@/reducers/productSlice'
import { Catalog } from '@/types/api'

import CatalogCard from './CatalogCard'

// Assuming Skeleton is correctly imported

const Catalogs: FC = () => {
  const [isLoading, setIsLoading] = useState(true) // State to track loading
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
      } finally {
        setIsLoading(false) // Stop showing Skeletons once data is fetched
      }
    }
    if (productData.length === 0) {
      fetchProducts()
    } else {
      setIsLoading(false) // Stop loading if data already exists
    }
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
      productData?.map((product: Catalog) => (
        <CatalogCard key={product.id} product={product} />
      )),
    [productData]
  )

  return (
    <div className='mt-5'>
      <div className='container mx-auto flex w-full flex-row flex-wrap items-center justify-around gap-5 rounded-lg bg-gray-100 p-2'>
        {isLoading ? skeletons : renderedProducts}
      </div>
    </div>
  )
}

export default Catalogs
