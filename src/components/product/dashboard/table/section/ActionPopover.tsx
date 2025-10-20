import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import type { Product } from '@/types/product'
import { SquarePen, Trash2 } from 'lucide-react'
import FormDialog from './FormDialog'
import { useState } from 'react'
import DeleteModal from '@/components/modal/DeleteModal'

export type Modalprops = {
  product: Product
}

function ActionPopover({ product }: Modalprops) {
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

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

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogTrigger>
          <Trash2 size={22} color='red' />
        </DialogTrigger>

        <DialogContent showCloseButton={false}>
          <DeleteModal product={product} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ActionPopover
