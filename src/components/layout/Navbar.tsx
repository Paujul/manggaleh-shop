'use client'

// import { useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { type FC, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { useSelector } from 'react-redux'

import navbarLogo from '@/assets/navbar-logo.png'
import { BalanceReducerState } from '@/reducers/balanceSlice'

import Modal from './Modal'
import Search from './Search'

// interface NavLinkProps {
//   href: string
//   children: string
// }

const Navbar: FC = () => {
  const balance = useSelector((state: BalanceReducerState) => state.balance)
  const [open, setOpen] = useState(false)

  return (
    <>
      <Modal open={open} setOpen={setOpen} />
      <nav className='sticky top-0 z-10 w-full rounded border-gray-200 bg-gray-100 px-2 py-2.5 drop-shadow-md sm:px-4'>
        <div className='container mx-auto flex flex-grow flex-wrap items-center justify-between'>
          <Link href='/' className='flex items-center'>
            <Image
              src={navbarLogo}
              className='mr-3 h-6 w-auto sm:h-9'
              alt='Manggaleh Shop'
            />

            <span className='self-center whitespace-nowrap text-xl font-semibold text-green-700/70'>
              Manggaleh Shop
            </span>
          </Link>
          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden'
            aria-controls='navbar-default'
            aria-expanded='false'
          >
            <span className='sr-only'>Open Upload</span>
            <svg
              className='h-6 w-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>

          <Search />

          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-100 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-gray-100 md:text-sm md:font-medium'>
              <li>
                <button
                  className='navLink text-green-600 transition-all hover:cursor-pointer hover:text-green-700'
                  aria-current='page'
                  onClick={() => setOpen(true)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-6 w-6'
                  >
                    <path d='M6 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H6zM15.75 3a3 3 0 00-3 3v2.25a3 3 0 003 3H18a3 3 0 003-3V6a3 3 0 00-3-3h-2.25zM6 12.75a3 3 0 00-3 3V18a3 3 0 003 3h2.25a3 3 0 003-3v-2.25a3 3 0 00-3-3H6zM17.625 13.5a.75.75 0 00-1.5 0v2.625H13.5a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0v-2.625h2.625a.75.75 0 000-1.5h-2.625V13.5z' />
                  </svg>
                </button>
              </li>
              <li>
                <Link href='/cart' className='navLink'>
                  My Cart
                </Link>
              </li>
              <li>
                <Link href='/dashboard' className='navLink'>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href='/about' className='navLink'>
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <NumericFormat
              value={balance}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp '}
              renderText={(value) => (
                <span className='button-primary hover:cursor-default'>
                  {value}
                </span>
              )}
            />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
