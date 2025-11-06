import { type Dispatch, type SetStateAction, useState } from 'react'
import { LoaderCircle } from 'lucide-react'

import { useDeleteProduct } from '@/services/mutations/useDeleteProduct'
import { handleImageDelete } from '../form/handleImageDelete'
import type { UploadProgressState } from '../form/handleImageUpload'
import type { ModalProps } from '../product/dashboard/table/section/ActionPopover'
import Button from '../ui/Button'
import { DialogDescription, DialogTitle } from '../ui/dialog'

type DeleteModalProps = ModalProps & {
  isDeleting: boolean
  setIsDeleting: Dispatch<SetStateAction<boolean>>
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteModal({
  product,
  isDeleting,
  setIsDeleting,
  onOpenChange,
}: DeleteModalProps) {
  const deleteProduct = useDeleteProduct()
  const [, setUploadProgress] = useState<UploadProgressState>({
    percent: 0,
    label: 'Deleting...',
  })

  const handleDeleteProduct = async (id: string) => {
    setIsDeleting(true)
    await handleImageDelete(product?.imgPublicId, setUploadProgress)
    await deleteProduct.mutateAsync(id)
    setIsDeleting(false)
  }

  const handleCloseModal = () => {
    onOpenChange(false)
  }

  return (
    <div className='flex flex-col gap-5'>
      <DialogDescription className='sr-only'>
        Create a product through this form
      </DialogDescription>

      <DialogTitle>Delete {product.name}?</DialogTitle>

      <span>This action is irreversible</span>

      <div className='ml-auto flex items-center gap-4'>
        <Button onClick={handleCloseModal} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          className='border-black bg-black text-white'
          onClick={() => handleDeleteProduct(product.id)}
        >
          {isDeleting ? <LoaderCircle className='animate-spin' /> : 'Confirm'}
        </Button>
      </div>
    </div>
  )
}

export default DeleteModal
