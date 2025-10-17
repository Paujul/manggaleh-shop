import type { ChangeEvent } from 'react'

type ComponentProps = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  previewImage: string | null | undefined
}

function FormImageInput({ handleChange, previewImage }: ComponentProps) {
  return (
    <label htmlFor='product-image'>
      <span className='mb-2'>Product Image</span>
      <input
        type='file'
        name='product-image'
        id='product-image'
        onChange={(e) => handleChange(e)}
        className='hidden'
      />
      {previewImage ? (
        <img
          src={previewImage}
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
