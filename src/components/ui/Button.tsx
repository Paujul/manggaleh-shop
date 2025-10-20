import { cn } from '@/utils/cn'
import { ChevronDown } from 'lucide-react'
import type { MouseEventHandler, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  className?: string
  dropdown?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

function Button({ children, className, dropdown, onClick }: ButtonProps) {
  return (
    <button className={cn('button', className)} onClick={onClick}>
      {children}

      {dropdown && <ChevronDown size={20} color='var(--color-gray-400)' />}
    </button>
  )
}

export default Button
