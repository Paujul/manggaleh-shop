import { Outlet } from 'react-router'

import { Toaster } from '../ui/sonner'

import Footer from './Footer'
import Navbar from './Navbar'

const AppLayout = () => (
  <div className='flex min-h-[100dvh] flex-col bg-[#F7F7F6]'>
    <Navbar />
    <Outlet />
    <Footer />
    <Toaster position='top-right' expand={true} />
  </div>
)

export default AppLayout
