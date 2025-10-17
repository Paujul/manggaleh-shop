import { useState, type ChangeEvent, type FormEvent } from 'react'
import getButtonStyle from './getButtonStyle'
import FormImageInput from './FormImageInput'
import {
  handleImageUpload,
  type UploadProgressState,
} from './handleImageUpload'
import { useCreateProduct } from '@/services/mutations/useCreateProduct'
import type { FormDialogProps } from '../product/dashboard/table/section/FormDialog'
import { cn } from '@/utils/cn'

export default function Form({ open, onOpenChange }: FormDialogProps) {
  const createProduct = useCreateProduct()
  const [imgFile, setImgFile] = useState<File | undefined>()
  const [previewImage, setPreviewImage] = useState<string | undefined>()
  const [uploadProgress, setUploadProgress] = useState<UploadProgressState>({
    percent: 0,
    label: 'Submit',
  })

  // Upload progress tracker
  const idleStates = ['Submit', 'Complete']
  const isIdleState = idleStates.some(
    (label) => uploadProgress.label.toLowerCase() === label.toLowerCase()
  )
  const clampedProgress = Math.min(Math.max(uploadProgress.percent, 0), 100)

  /*
   * Tracker for uploading, createProduct & Cloudinary upload are separate
   * can't use createProduct's isPending when uploading thus making
   * the Submit button disabled only when uploaded
   * Hence why there should be another var (Trying not to create another useState)
   */
  const isUploading = !idleStates.includes(uploadProgress.label)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile(e.target.files[0])
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
      setUploadProgress({ percent: 0, label: 'Submit' })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formElement = e.currentTarget

    try {
      const imgUrl = await handleImageUpload(imgFile, setUploadProgress)
      if (!imgUrl) {
        setUploadProgress({ percent: 0, label: 'Submit' })
      }

      const formData = new FormData(formElement)

      setUploadProgress({ percent: 100, label: 'Saving...' })

      await createProduct.mutateAsync({
        name: String(formData.get('name')),
        price: Number(formData.get('price')),
        qty: Number(formData.get('qty')),
        imgUrl: imgUrl ? imgUrl : undefined,
      })

      setUploadProgress({ percent: 100, label: 'Complete' })
      onOpenChange(!open)
    } catch (error) {
      console.error('Failed to create product', error)
      setUploadProgress({ percent: 0, label: 'Submit' })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-3 max-w-lg rounded-lg'
    >
      <label htmlFor='name' className='flex flex-col gap-1 '>
        <span>Product Name</span>
        <input
          name='name'
          type='text'
          className='border-2 rounded-lg border-gray-400 py-1 px-2'
        />
      </label>
      <label htmlFor='price' className='flex flex-col gap-1 relative'>
        <span>Price</span>
        <input
          name='price'
          type='text'
          className='border-2 rounded-lg border-gray-400 py-1 pl-7 pr-2'
        />
        <span className='absolute left-2 top-8.5'>Rp</span>
      </label>
      <label htmlFor='qty' className='flex flex-col gap-1 '>
        <span>Qty</span>
        <input
          name='qty'
          type='text'
          className='border-2 rounded-lg border-gray-400 py-1 px-2'
        />
      </label>

      <FormImageInput
        handleChange={(e) => handleImageChange(e)}
        previewImage={previewImage}
      />

      <button
        type='submit'
        className={cn(
          'hover:cursor-pointer p-3 rounded-lg font-medium text-xl',
          createProduct.isPending || (isUploading && 'hover:cursor-not-allowed')
        )}
        style={getButtonStyle(isIdleState, clampedProgress)}
        disabled={createProduct.isPending || isUploading}
      >
        {uploadProgress.label}
      </button>
    </form>
  )
}
