import { paths } from '@/config/paths'
import { Info, Package, Search, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router'

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
    <nav className='h-16 bg-white flex items-center'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link to={paths.home.path}>
          <h1 className='font-bold text-2xl'>Manggaleh Shop</h1>
        </Link>

        <div className='relative'>
          <input
            type='text'
            name='product-search'
            placeholder='Search...'
            className='rounded-lg focus:outline-none pl-4 py-1 pr-7'
          />
          <Search className='absolute right-1.5 top-[5px] size-5 text-gray-400' />
        </div>

        <div className='flex gap-5 text-sm font-medium items-center'>
          {links.map((item) => (
            <Link
              key={item.id}
              className='flex items-center px-2 py-1  gap-1.5 hover:cursor-pointer'
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
