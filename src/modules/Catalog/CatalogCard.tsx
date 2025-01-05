import { FC, useEffect, useState } from 'react'
// import Image from 'next/image'
import { NumericFormat } from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'

import { addToCart } from '@/reducers/cartSlice'
import { RootState } from '@/store'
import { Catalog } from '@/types/api'

// Define the prop types
interface CatalogCardProps {
  product: Catalog
  index: number
}

const CatalogCard: FC<CatalogCardProps> = ({ product }) => {
  const dispatch = useDispatch()

  const cartSlice = useSelector((state: RootState) => state.cart)
  // const productSlice = useSelector((state: RootState) => state.products)
  const [qty, setQty] = useState<number>(product.qty)
  const handleCart = (product: Catalog) => {
    dispatch(addToCart(product))
    setQty(qty - 1)
    console.log(cartSlice)
  }

  useEffect(() => {
    setQty(product.qty)
  }, [product])

  console.log(product)
  return (
    <div className='card m-5'>
      {/* <Image
        // src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${product.imgId}`}
        src={'asd'}
        className='h-48 w-full object-cover'
        width={200}
        height={192}
        alt={product.nama}
      /> */}
      <div className='h-48 w-full bg-black object-cover' />

      <h2 className='product-title mx-10 my-2 text-center' title={product.name}>
        {product.name}
      </h2>

      <div className='price'>
        <div className='mt-1 flex items-center justify-center gap-2'>
          <NumericFormat
            value={product.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp '}
            renderText={(value) => (
              <span className='text-l font-bold'>{value}</span>
            )}
          />
          <span className={qty > 0 ? 'badge-available' : 'badge-empty'}>
            Stok: {qty}
          </span>
        </div>

        <div className='mt-2 flex gap-3'>
          <button
            className={qty > 0 ? 'button-primary' : 'button-empty'}
            onClick={handleCart.bind(null, product)}
            disabled={qty === 0}
          >
            {qty > 0 ? '+Keranjang' : 'Barang Habis'}
          </button>
          <button className='button-icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='h-6 w-6'
            >
              <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CatalogCard
