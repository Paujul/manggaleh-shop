import { cn } from '@/utils/cn'
import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  className?: string
  dropdown?: boolean
}

function Button({ children, className, dropdown }: ButtonProps) {
  return (
    <button className={cn('button', className)}>
      {children}

      {dropdown && <ChevronDown size={20} color='var(--color-gray-400)' />}
    </button>
  )
}

export default Button
