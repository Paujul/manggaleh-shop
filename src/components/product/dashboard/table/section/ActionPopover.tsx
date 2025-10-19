import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import type { Product } from '@/types/product'
import { SquarePen, Trash2 } from 'lucide-react'
import FormDialog from './FormDialog'
import { useState } from 'react'

type Props = {
  product: Product
}

function ActionPopover({ product }: Props) {
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false)
  return (
    <div className='flex gap-4'>
      <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
        <DialogTrigger>
          <SquarePen size={22} />
        </DialogTrigger>

        <DialogContent className='px-4 py-5' showCloseButton={false}>
          <FormDialog
            open={isFormModalOpen}
            onOpenChange={setIsFormModalOpen}
            isEdit={true}
            product={product}
          />
        </DialogContent>
      </Dialog>
      <Trash2 size={22} color='red' />
    </div>
  )
}

export default ActionPopover
