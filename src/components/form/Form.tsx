import axios from 'axios'
import { useState, type ChangeEvent, type FormEvent } from 'react'
// import { useCreateProduct } from '@/services/mutations/useCreateProduct'

export default function Form() {
  // const createProduct = useCreateProduct()
  const [imgFile, setImgFile] = useState<string | null>(null)

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // Check if file is !null, buat TS doang jir
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0])
      setImgFile(URL.createObjectURL(e.target.files[0]))

      const imageFormData = new FormData()
      imageFormData.append('upload_preset', 'manggaleh')
      imageFormData.append('tags', 'browser_upload')
      imageFormData.append('file', e.target.files[0])
      console.log(imageFormData)

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/manggaleh/upload',
        imageFormData
      )

      console.log(res.data.secure_url)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const formData = new FormData(e.currentTarget)
    // createProduct.mutate({
    //   name: String(formData.get('name')),
    //   price: Number(formData.get('price')),
    //   qty: Number(formData.get('qty')),
    // })
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

      <label htmlFor='product-image'>
        <span className='mb-2'>Product Image</span>
        <input
          type='file'
          name='product-image'
          id='product-image'
          onChange={(e) => handleChange(e)}
          className='hidden'
        />
        {imgFile ? (
          <img
            src={imgFile}
            alt='Preview Image'
            className='mx-auto mt-2 object-contain h-64'
          />
        ) : (
          <div className='mx-auto text-gray-400 text-2xl font-medium size-64 border-2 rounded-lg border-dashed my-3 flex items-center justify-center'>
            Preview Image Here
          </div>
        )}
      </label>

      <button
        type='submit'
        className='hover:cursor-pointer p-3 rounded-lg font-medium bg-[#434343] text-white text-xl'
      >
        Submit
      </button>
    </form>
  )
}
