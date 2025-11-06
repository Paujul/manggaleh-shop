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
          autoComplete='off'
          className='rounded-lg border-2 border-gray-300 py-1 pr-7 pl-4'
        />
        <Search className='absolute top-[7px] right-2 size-5 text-gray-400' />
      </div>

      {/* Dropdowns */}
      <div className='flex gap-3 text-sm' id='dropdowns'>
        <Button className='flex items-center gap-2 md:truncate max-lg:w-36' dropdown>
          <Calendar size={20} className='size-5 shrink-0 lg:w-auto' />
          <span className='md:truncate lg:overflow-auto'>12 Sep - 28 Oct 2025</span>
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
