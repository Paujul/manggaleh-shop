import { CldImage } from 'next-cloudinary'
import { useState } from 'react'
import type { FC, MouseEventHandler } from 'react'
import { NumericFormat } from 'react-number-format'

import { useAppDispatch } from '@/hooks/store'
import { addToCartThunk } from '@/reducers/cartSlice'
import { Catalog } from '@/types/api'

interface CatalogCardProps {
  product: Catalog
}

const CatalogCard: FC<CatalogCardProps> = ({ product }) => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [imageSrc, setImageSrc] = useState(
    product.image?.url ?? '/assets/image-unavailable-icon.avif'
  ) // Ensure the fallback path

  const handleImageError = () => {
    console.error(
      `Can't load image for product: ${product.name}, using fallback image`
    )
    setImageSrc(
      'https://img.freepik.com/premium-vector/image-unavailable-icon_192037-900.jpg'
    ) // Dynamically set the fallback
  }

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = () => {
    // dispatch(addToCartAndReduceQty({ product, qty: 1 }))
    dispatch(addToCartThunk({ product, qty: 1 }))
  }

  return (
    <div className='card m-5'>
      <div className='relative h-48 w-full'>
        {isLoading && (
          <div className='absolute left-0 top-0 h-48 w-full animate-pulse bg-gray-200'></div>
        )}
        <CldImage
          src={imageSrc}
          className='h-48 w-full object-cover'
          width={256}
          height={245}
          crop='fill'
          alt={product.name}
          loading='lazy'
          placeholder='blur'
          blurDataURL='image-unavailable-icon.avif'
          onLoad={() => setIsLoading(false)}
          onError={handleImageError} // Dynamically switch to fallback
        />
      </div>

      <h2 className='product-title mx-10 my-2 text-center' title={product.name}>
        {product.name}
      </h2>

      <div className='price'>
        <div className='mt-1 flex items-center justify-center gap-2'>
          <NumericFormat
            value={product.price}
            displayType='text'
            thousandSeparator={true}
            prefix='Rp '
            renderText={(value) => (
              <span className='text-l font-bold'>{value}</span>
            )}
          />
          <span className={product.qty > 0 ? 'badge-available' : 'badge-empty'}>
            Stok: {product.qty}
          </span>
        </div>

        <div className='mt-2 flex gap-3'>
          <button
            className={product.qty > 0 ? 'button-primary' : 'button-empty'}
            disabled={product.qty === 0}
            onClick={handleAddToCart}
          >
            {product.qty > 0 ? '+Keranjang' : 'Barang Habis'}
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
