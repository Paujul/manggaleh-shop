'use client'

import type { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import Footer from '@/components/layout/Footer'
import { store } from '@/store'

import Navbar from './../components/layout/Navbar'

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <Navbar />
      {children}
      <Footer bottom={true} />
    </Provider>
  )
}

export default AppProvider
