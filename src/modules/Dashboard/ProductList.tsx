import { type FC, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { useDispatch } from 'react-redux'

import client from '@/lib/axios/client'
import { setProducts } from '@/reducers/productSlice'
import { Catalog } from '@/types/api'

type Product = {
  item: Catalog
  handleEditProduct: (data: Catalog) => void
}

const ProductList: FC<Product> = ({ item, handleEditProduct }) => {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)

  const edit = (data: Catalog) => {
    setIsEdit(!isEdit)
    handleEditProduct(data)
  }
  const remove = async (id: number) => {
    await client
      .delete(`/products/${id}`)
      .then(() => {
        console.log('Item deleted successfully')
      })
      .catch((error) => {
        console.error('Error deleting item:', error)
      })
    await client.get('/products').then((res) => {
      // dispatch({ type: 'SET_PRODUCTS', payload: res.data.products })
      dispatch(setProducts(res.data.products))
    })
  }

  return (
    <tr className='border-b bg-white'>
      <th
        scope='row'
        className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'
      >
        {item.name}
      </th>
      <td className='px-6 py-4 text-center'>{item.qty}</td>
      <NumericFormat
        value={item.price}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'Rp'}
        renderText={(value) => <td className='px-6 py-4'>{value}</td>}
      />
      <td className='px-6 py-4'>
        <div className='flex justify-around'>
          <span className='text-green-500' onClick={() => edit(item)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 cursor-pointer'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
              />
            </svg>
          </span>

          <span className='text-red-500' onClick={() => remove(item.id)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 cursor-pointer'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>
          </span>
        </div>
      </td>
    </tr>
  )
}

export default ProductList
