import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

type CellProps = {
  children: ReactNode
  className?: string
}

export const Cell = ({ children, className }: CellProps) => {
  return <div className={cn('flex-1 basis-0', className)}>{children}</div>
}

Cell.displayName = 'TableSection.Cell'
