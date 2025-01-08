import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import client from '@/lib/axios/client'
import { setProducts } from '@/reducers/productSlice'
import { Catalog } from '@/types/api'

type AppProps = {
  editData?: Catalog | null
}

const EditField: FC<AppProps> = ({ editData }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState<Catalog | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleReset = () => {
    setData(null) // Reset the data to null
    setIsEditing(false) // Set isEditing to false
  }

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (data) {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data || !data.name || !data.qty || !data.price) {
      alert('Data tidak boleh kosong')
      return
    }

    try {
      await Promise.all([
        client
          .put(`/products/${data.id}`, {
            name: data.name,
            qty: Number(data.qty) as number,
            price: Number(data.price) as number,
            imgId: data.imgId,
          })
          .then(async () => {
            // Trigger GET only after PUT completes
            return client.get('/products').then((res) => {
              console.log(res.data)
              dispatch(setProducts(res.data.products))
            })
          }),
      ])

      handleReset()
    } catch (error) {
      console.error('Error in handleSubmit:', error)
    }

    handleReset()
  }

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      setData(editData)
      setIsEditing(true)
    } else {
      setData(null)
      setIsEditing(false)
    }
  }, [editData])

  console.log('Edit Field data:', data)
  console.log('Is Editing:', isEditing)

  return (
    <tr className='border-b bg-white'>
      <th className='whitespace-nowrap px-2 py-1 font-medium text-gray-900'>
        <input
          type='text'
          autoComplete='off'
          placeholder='Icikiwir ...'
          name='name'
          value={data?.name || ''}
          className={`rounded-lg p-3 ${!isEditing ? 'bg-gray-100' : ''}`}
          onChange={handleEdit}
          disabled={!isEditing}
        />
      </th>
      <td>
        <input
          type='number'
          autoComplete='off'
          placeholder='420'
          name='qty'
          value={data?.qty ?? ''} // Use nullish coalescing to handle undefined
          className={`rounded-lg p-3 ${!isEditing ? 'bg-gray-100' : ''}`}
          onChange={handleEdit}
          disabled={!isEditing}
        />
      </td>
      <td>
        <input
          type='number'
          autoComplete='off'
          placeholder='69000'
          name='price'
          value={data?.price ?? ''} // Use nullish coalescing to handle undefined
          className={`rounded-lg p-3 ${!isEditing ? 'bg-gray-100' : ''}`}
          onChange={handleEdit}
          disabled={!isEditing}
        />
      </td>
      <td>
        <div className='flex justify-around'>
          <span className='text-green-500' onClick={handleSubmit}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='h-6 w-6 cursor-pointer'
            >
              <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z' />
              <path d='M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z' />
            </svg>
          </span>

          <button type='reset' onClick={handleReset}>
            <span className='text-red-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                />
              </svg>
            </span>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default EditField
