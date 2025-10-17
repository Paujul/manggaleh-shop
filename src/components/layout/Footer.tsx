import { Github, Instagram } from 'lucide-react'

function Footer() {
  return (
    <div className='h-16 bg-white border-t-2 border-gray-200 mt-auto'>
      <div className='container mx-auto h-full flex justify-between items-center text-gray-500 text-sm'>
        <span>© 2022 Manggaleh Shop™ - App Version 0.3.0</span>
        <ul className='flex gap-3'>
          <li className='rounded-full size-8 flex items-center justify-center bg-white'>
            <Github />
          </li>
          <li className='rounded-full size-8 flex items-center justify-center bg-white'>
            <Instagram />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
