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
          className='mx-auto mt-2 h-64 object-contain'
        />
      ) : (
        <div className='mx-auto my-3 flex size-64 items-center justify-center rounded-lg border-2 border-dashed text-2xl font-medium text-gray-400'>
          Preview Image Here
        </div>
      )}
    </label>
  )
}

export default FormImageInput
