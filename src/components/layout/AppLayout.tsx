import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster } from '../ui/sonner'

const AppLayout = () => (
  <div className='bg-[#F7F7F6] min-h-[100dvh] flex flex-col'>
    <Navbar />
    <Outlet />
    <Footer />
    <Toaster position='top-right' expand={true} />
  </div>
)

export default AppLayout
