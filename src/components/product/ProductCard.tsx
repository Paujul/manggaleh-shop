import type { Product } from '@/types/product'
import { Bookmark } from 'lucide-react'

type ProductProps = {
  product: Product
}

export default function ProductCard({ product }: ProductProps) {
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className='min-w-[200px] min-h-64 shadow-md rounded-lg flex flex-col gap-5 p-3 bg-white'>
      <figure>
        <img
          src='https://images.pexels.com/photos/25740960/pexels-photo-25740960.jpeg'
          alt='Product Image'
          className='object-contain max-h-52 w-full bg-gray-200'
        />
      </figure>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center text-sm gap-2'>
          <Bookmark className='size-5 inline hover:cursor-pointer' />
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
