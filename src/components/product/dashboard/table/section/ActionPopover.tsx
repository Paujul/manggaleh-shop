import { SquarePen, Trash2 } from 'lucide-react'

function ActionPopover() {
  return (
    <div className='flex gap-4'>
      <SquarePen size={22} />
      <Trash2 size={22} color='red' />
    </div>
  )
}

export default ActionPopover
