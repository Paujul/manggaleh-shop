import { Cell } from './Cell'

const Header = () => {
  return (
    <div className='flex items-center gap-5 rounded-t-lg bg-[#F7F7F6] p-5 text-sm font-semibold'>
      <div className='size-5 rounded-sm border-2 border-gray-500' />
      <Cell className='flex-[2]'>Product Name</Cell>
      <Cell>Category</Cell>
      <Cell>Stock</Cell>
      <Cell>Price</Cell>
      <Cell>Status</Cell>
      <Cell className='text-center'>Action</Cell>
    </div>
  )
}

Header.displayName = 'ProductTable.Header'

export const ProductTable = Object.assign({
  Header,
})
