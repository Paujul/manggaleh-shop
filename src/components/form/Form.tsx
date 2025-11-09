import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useState,
} from 'react'
import { type FieldError, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateProduct } from '@/services/mutations/useCreateProduct'
import { useEditProduct } from '@/services/mutations/useEditProduct'
import type { Product } from '@/types/product'
import { cn } from '@/utils/cn'
import type { FormDialogProps } from '../product/dashboard/table/section/FormDialog'

import { formInputConfig } from './functions/formInputConfigs'
import getButtonStyle from './functions/getButtonStyle'
import { handleImageDelete } from './functions/handleImageDelete'
import {
  handleImageUpload,
  type UploadProgressState,
} from './functions/handleImageUpload'
import FormFieldInput from './inputs/FormFieldInput'
import FormImageInput from './inputs/FormImageInput'

type FormProps = FormDialogProps & {
  setFormStatus: Dispatch<SetStateAction<boolean>>
}

export type ProductFormData = Omit<Product, 'id' | 'imgUrl'> & {
  imgFile?: FileList
}

export default function Form({
  open,
  onOpenChange,
  isEdit,
  product,
}: FormProps) {
  const createProduct = useCreateProduct()
  const editProduct = useEditProduct()
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

  const acceptedFormats = ['jpg', 'jpeg', 'png']
  const maxSize = 5 * 1024 * 1024 // 5MB

  const validateImageFile = (file?: File) => {
    if (!file) return null
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    if (!fileExtension || !acceptedFormats.includes(fileExtension)) {
      return 'Invalid file format. Accepted formats: jpg, jpeg, png'
    }
    if (file.size > maxSize) {
      return 'Size must be within 5MB'
    }
    return null
  }

  const resetImageState = () => {
    setImgFile(undefined)
    setPreviewImage(undefined)
    setUploadProgress({ percent: 0, label: 'Submit' })
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      resetImageState()
      return
    }

    const validationMessage = validateImageFile(file)
    if (validationMessage) {
      resetImageState()
      e.target.value = ''
      toast.error(validationMessage)
      return
    }

    setImgFile(file)
    setPreviewImage(URL.createObjectURL(file))
    setUploadProgress({ percent: 0, label: 'Submit' })
  }

  const imageField = register('imgFile', {
    validate: (files) => {
      const validationMessage = validateImageFile(files?.[0])
      return validationMessage ?? true
    },
    onChange: (event) => handleImageChange(event),
  })

  const onSubmit = async (data: ProductFormData) => {
    if (isEdit && product) {
      try {
        let replacedImage
        if (imgFile) {
          await handleImageDelete(product?.imgPublicId, setUploadProgress)
          replacedImage = await handleImageUpload(imgFile, setUploadProgress)
        }

        if (!replacedImage) {
          setUploadProgress({ percent: 0, label: 'Submit' })
        }

        setUploadProgress({ percent: 100, label: 'Saving...' })

        await editProduct.mutateAsync({
          id: product.id,
          name: data.name,
          price: data.price,
          qty: data.qty!,
          imgUrl: replacedImage ? replacedImage.url : undefined,
          imgPublicId: replacedImage ? replacedImage.publicId : undefined,
          imgDeleteToken: replacedImage ? replacedImage.deleteToken : undefined,
        })

        setUploadProgress({ percent: 100, label: 'Complete' })
        onOpenChange(!open)
        toast.success('Product created!')
      } catch (err) {
        console.error(err)
      }
    } else
      try {
        const uploadedImage = await handleImageUpload(
          imgFile,
          setUploadProgress
        )
        if (!uploadedImage) {
          setUploadProgress({ percent: 0, label: 'Submit' })
        }

        setUploadProgress({ percent: 100, label: 'Saving...' })

        await createProduct.mutateAsync({
          name: data.name,
          price: data.price,
          qty: data.qty!,
          imgUrl: uploadedImage ? uploadedImage.url : undefined,
          imgPublicId: uploadedImage ? uploadedImage.publicId : undefined,
          imgDeleteToken: uploadedImage ? uploadedImage.deleteToken : undefined,
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
      className='flex max-w-lg flex-col gap-3 rounded-lg'
    >
      <FormFieldInput
        label='name'
        defaultValue={product?.name}
        inputConfig={formInputConfig.name}
        register={register}
      />
      {errors.name && <span className='text-red-500'>*Field is required</span>}

      <FormFieldInput
        label='price'
        defaultValue={product?.price}
        inputConfig={formInputConfig.price}
        register={register}
        type='number'
        price
      />
      {errors.price && <span className='text-red-500'>*Field is required</span>}

      <FormFieldInput
        label='qty'
        defaultValue={product?.qty}
        inputConfig={formInputConfig.qty}
        register={register}
        type='number'
      />
      {errors.qty && <span className='text-red-500'>*Field is required</span>}

      <FormImageInput
        imageField={imageField}
        previewImage={previewImage}
        error={errors.imgFile as FieldError}
        existingImage={product?.imgUrl}
      />

      <button
        type='submit'
        className={cn(
          'rounded-lg p-3 text-xl font-medium hover:cursor-pointer',
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
