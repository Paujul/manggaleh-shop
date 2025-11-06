import { useState } from 'react'
import { SquarePen, Trash2 } from 'lucide-react'

import DeleteModal from '@/components/modal/DeleteModal'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import type { Product } from '@/types/product'

import FormDialog from './FormDialog'

export type ModalProps = {
  product: Product
}

function ActionPopover({ product }: ModalProps) {
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const isOverlayDisabled = (e: Event) => {
    if (isDeleting) e.preventDefault()
  }

  return (
    <div className='flex gap-4'>
      <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
        <DialogTrigger>
          <SquarePen size={22} className='hover:cursor-pointer' />
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
          <Trash2 size={22} color='red' className='hover:cursor-pointer' />
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          onInteractOutside={isOverlayDisabled}
        >
          <DeleteModal
            product={product}
            isDeleting={isDeleting}
            setIsDeleting={setIsDeleting}
            onOpenChange={setIsDeleteModalOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ActionPopover
