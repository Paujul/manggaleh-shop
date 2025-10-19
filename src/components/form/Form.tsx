import { useForm, type FieldError } from 'react-hook-form'
import { useState, type ChangeEvent } from 'react'
import getButtonStyle from './getButtonStyle'
import FormImageInput from './FormImageInput'
import {
  handleImageUpload,
  type UploadProgressState,
} from './handleImageUpload'
import { useCreateProduct } from '@/services/mutations/useCreateProduct'
import type { FormDialogProps } from '../product/dashboard/table/section/FormDialog'
import { cn } from '@/utils/cn'
import { toast } from 'sonner'
import type { Product } from '@/types/product'

type ProductFormData = Omit<Product, 'id' | 'imgUrl'> & {
  imgFile?: FileList
}

export default function Form({ open, onOpenChange }: FormDialogProps) {
  const createProduct = useCreateProduct()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>()

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
   * Tracker for uploading, createProduct & Cloudinary upload are separate,
   * we can't use createProduct's isPending when uploading thus making
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

  const imageField = register('imgFile', {
    validate: (files) => {
      const acceptedFormats = ['jpg', 'jpeg', 'png']
      const fileExtension = files?.[0]?.name?.split('.').pop()?.toLowerCase()
      if (fileExtension && !acceptedFormats.includes(fileExtension)) {
        return 'Invalid file format. Accepted formats: jpg, jpeg, png'
      }
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (files?.[0] && files[0].size > maxSize) {
        return 'Size must be within 5MB'
      }
      return true
    },
    onChange: (event) => handleImageChange(event),
  })

  const onSubmit = async (data: ProductFormData) => {
    console.log(data)
    try {
      const imgUrl = await handleImageUpload(imgFile, setUploadProgress)
      if (!imgUrl) {
        setUploadProgress({ percent: 0, label: 'Submit' })
      }

      setUploadProgress({ percent: 100, label: 'Saving...' })

      await createProduct.mutateAsync({
        name: data.name,
        price: data.price,
        qty: data.qty!,
        imgUrl: imgUrl ? imgUrl : undefined,
      })

      setUploadProgress({ percent: 100, label: 'Complete' })
      onOpenChange(!open)
      toast.success('Product created!')
    } catch (error) {
      console.error('Failed to create product', error)
      setUploadProgress({ percent: 0, label: 'Submit' })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-3 max-w-lg rounded-lg'
    >
      <div className='flex flex-col gap-1 '>
        <label htmlFor='name'>Product Name</label>
        <input
          type='text'
          className='border-2 rounded-lg border-gray-400 py-1 px-2'
          id='name'
          autoComplete='off'
          {...register('name', { required: true })}
        />
        {errors.name && <span className='text-red-500'>*Error</span>}
      </div>
      <div className='flex flex-col gap-1 relative'>
        <label htmlFor='price'>Price</label>
        <input
          className='border-2 rounded-lg border-gray-400 py-1 pl-7 pr-2'
          id='price'
          type='number'
          autoComplete='off'
          {...register('price', {
            required: true,
            maxLength: 7,
            min: 0,
            valueAsNumber: true,
          })}
        />
        {errors.price && <span className='text-red-500'>*Error</span>}
        <span className='absolute left-2 top-8.5'>Rp</span>
      </div>
      <div className='flex flex-col gap-1 '>
        <label htmlFor='qty'>Qty</label>

        <input
          className='border-2 rounded-lg border-gray-400 py-1 px-2'
          id='qty'
          type='number'
          autoComplete='off'
          {...register('qty', {
            required: true,
            maxLength: 3,
            min: 0,
            valueAsNumber: true,
          })}
        />
        {errors.qty && <span className='text-red-500'>*Error</span>}
      </div>

      <FormImageInput
        imageField={imageField}
        previewImage={previewImage}
        error={errors.imgFile as FieldError}
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
