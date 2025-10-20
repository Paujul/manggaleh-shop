import { useDeleteProduct } from '@/services/mutations/useDeleteProduct'
import type { Modalprops } from '../product/dashboard/table/section/ActionPopover'
import Button from '../ui/Button'
import { DialogDescription, DialogTitle } from '../ui/dialog'
// import { handleImageDelete } from '../form/handleImageDelete'

function DeleteModal({ product }: Modalprops) {
  const deleteProduct = useDeleteProduct()

  const handleDeleteProduct = async (id: string) => {
    // await handleImageDelete(
    //   product?.imgPublicId,
    //   product?.imgDeleteToken,
    //   imgFile,
    //   setUploadProgress
    // )
    await deleteProduct.mutateAsync(id)
  }
  return (
    <div className='flex flex-col gap-5'>
      <DialogDescription className='sr-only'>
        Create a product through this form
      </DialogDescription>

      <DialogTitle>Delete {product.name}?</DialogTitle>

      <span>This action is irreversible</span>

      <div className='flex items-center gap-4 ml-auto'>
        <Button>Cancel</Button>
        <Button
          className='text-white bg-black border-black'
          onClick={() => handleDeleteProduct(product.id)}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default DeleteModal
