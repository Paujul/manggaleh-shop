import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Toaster, toast } from 'sonner'

import client from '@/lib/axios/client'
import { setProducts } from '@/reducers/productSlice'

type ModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

const Modal: FC<ModalProps> = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  const [file, setFile] = useState<File | null>(null) // File input for the image
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    qty: '',
  })
  const [uploading, setUploading] = useState(false)

  const isFormValid = () => {
    return (
      productForm.name.trim() !== '' &&
      productForm.price.trim() !== '' &&
      productForm.qty.trim() !== '' &&
      file !== null
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { name, price, qty } = productForm

    if (!name || !price || !qty || !file) {
      alert('All fields are required')
      return
    }

    setUploading(true)

    try {
      // Upload the file to your /api/cloudinary route
      const formData = new FormData()
      formData.append('file', file)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image')
      }

      const uploadData = await uploadResponse.json()
      console.log(uploadData)
      const image = {
        filename: uploadData.filename,
        url: uploadData.url,
        publicId: uploadData.publicId,
      }

      // POST product data to your /api/products route
      const productResponse = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          price: Number(price),
          qty: Number(qty),
          image,
        }),
      })

      if (!productResponse.ok) {
        throw new Error('Failed to add product')
      }

      const productData = await productResponse.json()
      console.log('Product added:', productData.product)

      // Optionally refetch products or update state
      toast.success('Berhasil menambahkan produk!')
      await client.get('/products').then((res) => {
        console.log(res.data)
        dispatch(setProducts(res.data.products))
      })
      setProductForm({
        name: '',
        price: '',
        qty: '',
      })
      setFile(null)
      setOpen(false) // Close the modal
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while adding the product.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <Toaster position='top-center' richColors />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className='relative z-10'
      >
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
        />

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <DialogPanel
              transition
              className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'
            >
              <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start lg:block'>
                  <div className='flex flex-shrink-0 items-center gap-6 rounded-full bg-green-50 p-3'>
                    <div className='mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-200 sm:mx-0 sm:size-10'>
                      <SquaresPlusIcon
                        aria-hidden='true'
                        className='size-6 text-green-600'
                      />
                    </div>

                    <DialogTitle
                      as='h3'
                      className='text-base font-semibold text-gray-900'
                    >
                      Tambah Produk
                    </DialogTitle>
                  </div>
                  <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <div className='mt-2'>
                      <form className='space-y-4' onSubmit={handleSubmit}>
                        <div>
                          <label
                            htmlFor='file-upload'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Upload File
                          </label>
                          <input
                            type='file'
                            id='fimage'
                            name='fimage'
                            onChange={handleFileChange}
                            className='mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-green-500 focus:ring-green-500'
                          />
                        </div>
                        <div>
                          <label
                            htmlFor='product-name'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Product Name
                          </label>
                          <input
                            type='text'
                            id='product-name'
                            name='product-name'
                            value={productForm.name}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                name: e.target.value,
                              })
                            }
                            className='mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-green-500 focus:ring-green-500'
                          />
                        </div>
                        <div>
                          <label
                            htmlFor='product-price'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Product Price
                          </label>
                          <input
                            type='number'
                            id='product-price'
                            name='product-price'
                            value={productForm.price}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                price: e.target.value,
                              })
                            }
                            min={0}
                            className='mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-green-500 focus:ring-green-500'
                          />
                        </div>
                        <div>
                          <label
                            htmlFor='product-qty'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Product Quantity
                          </label>
                          <input
                            type='number'
                            id='product-qty'
                            name='product-qty'
                            value={productForm.qty}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                qty: e.target.value,
                              })
                            }
                            min={0}
                            className='mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-green-500 focus:ring-green-500'
                          />
                        </div>
                        <div className='flex justify-end gap-3'>
                          <button
                            type='button'
                            onClick={() => setOpen(false)}
                            className='inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                          >
                            Cancel
                          </button>
                          <button
                            type='submit'
                            disabled={uploading || !isFormValid()}
                            className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:mt-0 sm:w-auto ${
                              uploading || !isFormValid()
                                ? 'cursor-not-allowed select-none bg-gray-400'
                                : 'bg-green-600 hover:bg-green-500'
                            }`}
                          >
                            {uploading ? 'Uploading...' : 'Dagang!'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Modal
