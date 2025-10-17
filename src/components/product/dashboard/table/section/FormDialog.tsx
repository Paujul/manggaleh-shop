import Form from '@/components/form/Form'
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'

export type FormDialogProps = {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

function FormDialog({ open, onOpenChange }: FormDialogProps) {
  return (
    <>
      <DialogDescription className='sr-only'>
        Create a product through this form
      </DialogDescription>
      <div className='flex justify-center items-center'>
        <DialogTitle className='text-center text-2xl font-medium flex-1'>
          Create Product
        </DialogTitle>
        <DialogClose>
          <X className='cursor-pointer' />
        </DialogClose>
      </div>

      <Form open={open} onOpenChange={onOpenChange} />
    </>
  )
}

export default FormDialog
