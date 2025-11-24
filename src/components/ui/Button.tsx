import { ChevronDown } from 'lucide-react'
import type { MouseEventHandler, ReactNode } from 'react'

import { cn } from '@/utils/cn'

type ButtonProps = {
  children: ReactNode
  className?: string
  dropdown?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

function Button({ children, className, dropdown, ...rest }: ButtonProps) {
  return (
    <button className={cn('button', className)} {...rest}>
      {children}

      {dropdown && (
        <ChevronDown
          size={20}
          color='var(--color-gray-400)'
          className='shrink-0'
        />
      )}
    </button>
  )
}

export default Button
