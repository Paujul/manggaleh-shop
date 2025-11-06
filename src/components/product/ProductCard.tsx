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
      <figure>
        <img
          src={product.imgUrl ? product.imgUrl : '/no-image.jpg'}
          alt='Product Image'
          className='max-h-52 w-full bg-gray-200 object-contain'
        />
      </figure>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2 text-sm'>
          <Bookmark className='inline size-5 hover:cursor-pointer' />
          <span className='font-medium'>{product.rating}</span>
          <span className='text-gray-500'>({product.reviews} reviews)</span>
        </div>

        <span className='text-sm font-medium'>{product.name}</span>
        <span className='font-bold'>
          {product.price ? `Rp ${formatPrice(product.price)}` : 'No Price'}
        </span>
      </div>
    </div>
  )
}
