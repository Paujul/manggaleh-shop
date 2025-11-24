import { Github, Instagram } from 'lucide-react'

function Footer() {
  return (
    <div className='mt-auto h-16 border-t-2 border-gray-200 bg-white'>
      <div className='container mx-auto flex h-full items-center justify-between text-sm text-gray-500'>
        <span>© 2022 Manggaleh Shop™ - App Version 0.3.0</span>
        <ul className='flex gap-3'>
          <li className='flex size-8 items-center justify-center rounded-full bg-white'>
            <Github />
          </li>
          <li className='flex size-8 items-center justify-center rounded-full bg-white'>
            <Instagram />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
