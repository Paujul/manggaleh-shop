import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { Product } from '@/types/product'

import ActionPopover from './ActionPopover'
import { Cell } from './Cell'

type AppProps = {
  product: Product
}

export const Row = ({ product }: AppProps) => {
  const getQtyClassName = (qty: number) => {
    return qty < 0 ? 'text-red-500' : ''
  }

  return (
    <div className='flex items-center gap-5 rounded-t-lg p-5 text-[#5C5C5C]'>
      <div className='size-5 rounded-sm border-2 border-gray-500' />
      <Cell className='flex min-w-0 flex-[2] items-center gap-2'>
        <img
          src={product.imgUrl ? product.imgUrl : '/no-image.jpg'}
          alt='Product Image'
          className='size-10 shrink-0 rounded-lg object-cover'
        />
        <span className='line-clamp-2 overflow-hidden break-words whitespace-pre-wrap'>
          {product.name}
        </span>
      </Cell>
      <Cell>-</Cell>
      <Cell className={getQtyClassName(product.qty ?? 0)}>{product.qty}</Cell>
      <Cell>Rp {product.price}</Cell>
      <Cell>Status</Cell>
      <Cell className='text-center'>
        <Popover>
          <PopoverTrigger className='hover:cursor-pointer'>
            <span>•••</span>
          </PopoverTrigger>

          <PopoverContent className='w-auto'>
            <ActionPopover product={product} />
          </PopoverContent>
        </Popover>
      </Cell>
    </div>
  )
}

Row.displayName = 'TableSection.Cell'
