import type { Product } from '@/types/product'
import { Cell } from './Cell'

type AppProps = {
  product: Product
}

export const Row = ({ product }: AppProps) => {
  const getQtyClassName = (qty: number) => {
    return qty < 0 ? 'text-red-500' : ''
  }

  return (
    <div className='p-5 rounded-t-lg flex gap-5 items-center text-[#5C5C5C]'>
      <div className='size-5 border-2 border-gray-500 rounded-sm' />
      <Cell className='flex-[2] min-w-0 flex gap-2 items-center'>
        <img
          src={
            product.imgUrl
              ? product.imgUrl
              : 'https://images.pexels.com/photos/25740960/pexels-photo-25740960.jpeg'
          }
          alt='Product Image'
          className='object-cover rounded-lg size-10 shrink-0'
        />
        <span className='break-words whitespace-pre-wrap overflow-hidden line-clamp-2'>
          {product.name}
        </span>
      </Cell>
      <Cell>-</Cell>
      <Cell className={getQtyClassName(product.qty ?? 0)}>{product.qty}</Cell>
      <Cell>Rp {product.price}</Cell>
      <Cell>Status</Cell>
      <Cell>Action</Cell>
    </div>
  )
}

Row.displayName = 'TableSection.Cell'
