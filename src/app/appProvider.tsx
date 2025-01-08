'use client'

import type { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import Footer from '@/components/layout/Footer'
import { store } from '@/store'

import Navbar from './../components/layout/Navbar'

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <div className='flex min-h-screen flex-col'>
        <Navbar />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </div>
    </Provider>
  )
}

export default AppProvider
