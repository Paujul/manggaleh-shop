import { Calendar, ListFilter, Search } from 'lucide-react'
import Button from '@/components/ui/Button'

function ProductDashboardToolbar() {
  return (
    <div className='table-header flex items-center justify-between'>
      <div className='relative'>
        <input
          type='text'
          name='product-search'
          placeholder='Search...'
          className='border-2 rounded-lg border-gray-300 pl-4 py-1 pr-7'
        />
        <Search className='absolute right-2 top-[7px] size-5 text-gray-400' />
      </div>

      {/* Dropdowns */}
      <div className='flex text-sm gap-3' id='dropdowns'>
        <Button className='flex items-center gap-2' dropdown>
          <Calendar className='size-4' />
          <span>12 Sep - 28 Oct 2025</span>
        </Button>
        <Button className='flex items-center gap-1' dropdown>
          Status
        </Button>
        <Button className='flex items-center gap-1' dropdown>
          Category
        </Button>
        <Button className='flex items-center gap-1'>
          <ListFilter
            size={16}
            strokeWidth={2.75}
            color='var(--color-gray-400)'
          />
          Filter
        </Button>
      </div>
    </div>
  )
}

export default ProductDashboardToolbar
