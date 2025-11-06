import { useState } from 'react'
import { X } from 'lucide-react'

import Form from '@/components/form/Form'
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Product } from '@/types/product'

export type FormDialogProps = {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  isEdit: boolean
  product?: Product
}

function FormDialog({
  open,
  onOpenChange,
  isEdit = false,
  product,
}: FormDialogProps) {
  const [formStatus, setFormStatus] = useState(isEdit)
  return (
    <>
      <DialogDescription className='sr-only'>
        Create a product through this form
      </DialogDescription>
      <div className='flex items-center justify-center'>
        <DialogTitle className='flex-1 text-center text-2xl font-medium'>
          {product?.name ? 'Edit Product' : 'Create Product'}
        </DialogTitle>
        <DialogClose>
          <X className='cursor-pointer' />
        </DialogClose>
      </div>

      <Form
        open={open}
        onOpenChange={onOpenChange}
        isEdit={formStatus}
        setFormStatus={setFormStatus}
        product={product}
      />
    </>
  )
}

export default FormDialog
