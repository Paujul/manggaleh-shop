import { Cell } from './Cell'

const Header = () => {
  return (
    <div className='p-5 rounded-t-lg flex gap-5 items-center font-semibold text-sm bg-[#F7F7F6]'>
      <div className='size-5 border-2 border-gray-500 rounded-sm' />
      <Cell className='flex-[2] min-w-0'>Product Name</Cell>
      <Cell>Category</Cell>
      <Cell>Stock</Cell>
      <Cell>Price</Cell>
      <Cell>Status</Cell>
      <Cell>Action</Cell>
    </div>
  )
}

Header.displayName = 'ProductTable.Header'

export const ProductTable = Object.assign({
  Header,
})
