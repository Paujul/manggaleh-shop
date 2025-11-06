import { Info, Package, Search, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router'

import { paths } from '@/config/paths'

function Navbar() {
  const links = [
    {
      id: 1,
      label: 'Cart',
      icon: <ShoppingCart />,
      href: '#',
    },
    {
      id: 2,
      label: 'Products',
      icon: <Package />,
      href: paths.app.dashboard.path,
    },
    {
      id: 3,
      label: 'About',
      icon: <Info />,
      href: '#',
    },
  ]

  return (
    <nav className='flex h-16 items-center bg-white'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link to={paths.home.path}>
          <h1 className='text-2xl font-bold'>Manggaleh Shop</h1>
        </Link>

        <div className='relative'>
          <input
            type='text'
            name='product-search'
            placeholder='Search...'
            autoComplete='off'
            className='rounded-lg py-1 pr-7 pl-4 focus:outline-none'
          />
          <Search className='absolute top-[5px] right-1.5 size-5 text-gray-400' />
        </div>

        <div className='flex items-center gap-5 text-sm font-medium'>
          {links.map((item) => (
            <Link
              key={item.id}
              className='flex items-center gap-1.5 px-2 py-1 hover:cursor-pointer'
              to={item.href}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
