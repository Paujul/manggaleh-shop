import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

type CellProps = {
  children: ReactNode
  className?: string
}

export const Cell = ({ children, className }: CellProps) => {
  return (
    <div className={cn('flex-1 basis-0', className)}>{children}</div>
  )
}

Cell.displayName = 'TableSection.Cell'
