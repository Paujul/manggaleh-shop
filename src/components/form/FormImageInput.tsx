import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type ComponentProps = {
  imageField: UseFormRegisterReturn<'imgFile'>
  previewImage: string | null | undefined
  error?: FieldError
  existingImage: string | undefined
}

function FormImageInput({
  imageField,
  previewImage,
  error,
  existingImage,
}: ComponentProps) {
  const errorMessage = error?.message

  return (
    <label htmlFor='product-image'>
      <span className='mb-2'>Product Image</span>
      {errorMessage && (
        <span className='ml-2 text-red-500'>*{errorMessage}</span>
      )}
      <input
        type='file'
        id='product-image'
        className='hidden'
        {...imageField}
      />
      {previewImage || existingImage ? (
        <img
          src={previewImage || existingImage}
          alt='Preview Image'
          className='mx-auto mt-2 object-contain h-64'
        />
      ) : (
        <div className='mx-auto text-gray-400 text-2xl font-medium size-64 border-2 rounded-lg border-dashed my-3 flex items-center justify-center'>
          Preview Image Here
        </div>
      )}
    </label>
  )
}

export default FormImageInput
