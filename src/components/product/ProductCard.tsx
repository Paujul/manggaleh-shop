import { Bookmark } from 'lucide-react'

import type { Product } from '@/types/product'

type ProductProps = {
  product: Product
}

export default function ProductCard({ product }: ProductProps) {
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className='flex min-h-64 min-w-[200px] flex-col gap-5 rounded-lg bg-white p-3 shadow-md'>
      <figure className='h-full max-h-48'>
        <img
          src={product?.imgUrl ? product.imgUrl : '/no-image.jpg'}
          alt='Product Image'
          className='size-full bg-gray-200 object-contain'
        />
      </figure>

      <div className='mt-auto flex flex-col gap-2'>
        <div className='flex items-center gap-2 text-sm'>
          <Bookmark className='inline size-5 hover:cursor-pointer' />
          <span className='font-medium'>
            {product?.rating ? product.rating : '0/5'}
          </span>
          <span className='text-gray-500'>
            ({product?.reviews ? product.reviews : 'no'} reviews)
          </span>
        </div>

        <span className='line-clamp-3 text-sm font-medium break-words whitespace-pre-wrap'>
          {product.name}
        </span>
        <span className='truncate font-bold'>
          {product?.price ? `Rp ${formatPrice(product.price)}` : 'No Price'}
        </span>
      </div>
    </div>
  )
}
