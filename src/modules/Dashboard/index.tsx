import {
  type ChangeEvent,
  type FC,
  type MouseEvent,
  useEffect,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import fetchData from '@/lib/products'
import { setBalance } from '@/reducers/balanceSlice'
import { setProducts } from '@/reducers/productSlice'
import { Catalog } from '@/types/api'

import DashboardList from './DashboardProduct'
import EditField from './EditField'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

type Product = {
  products: {
    products: Catalog[]
  }
}

const Dashboard: FC = () => {
  const products = useSelector((state: Product) => state.products.products)
  const dispatch = useDispatch()

  const [bal, setBal] = useState(0)
  const [editData, setEditData] = useState<Catalog | null>(null)
  const regex = /^[0-9\b]+$/

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === '' || regex.test(e.target.value)) {
      setBal(Number(e.target.value))
    } else {
      e.target.value = ''
      alert('Saldo harus berupa angka')
    }
  }

  const handleEditProduct = (item: Catalog) => {
    setEditData(null) // Clear the state first to force a re-render
    setTimeout(() => {
      setEditData(item) // Update with the correct item after a brief delay
    }, 0)
  }
  const handleEditBalance = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(setBalance(bal))
    setBal(0)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchData()
        dispatch(setProducts(data.products))
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }
    if (products.length === 0) {
      fetchProducts()
    }
  }, [dispatch, products.length])

  return (
    <div className='mt-5 flex justify-center'>
      <div className='mainPage'>
        <div className='h-full w-4/5'>
          <h1 className='tableTextHeader'>Kelola Lapak Kamu</h1>
          <div className='relative overflow-auto'>
            <table className='table'>
              <thead className='tableHeader'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Nama Produk
                  </th>
                  <th scope='col' className='px-6 py-3 text-center'>
                    Jumlah Produk
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Harga
                  </th>
                  <th scope='col' className='px-6 py-3 text-center'>
                    Opsi
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <DashboardList
                    key={item.id}
                    item={item}
                    handleEditProduct={handleEditProduct}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='mb-5 mt-5 w-4/5'>
          <h1 className='tableTextHeader'>Edit Barang Kamu</h1>
          <table className='w-full text-left text-sm text-gray-500'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Nama Produk
                </th>
                <th scope='col' className='px-6 py-3'>
                  Jumlah Produk
                </th>
                <th scope='col' className='px-6 py-3'>
                  Harga
                </th>
                <th scope='col' className='px-6 py-3 text-center'>
                  Opsi
                </th>
              </tr>
            </thead>
            <tbody>
              <EditField editData={editData} />
            </tbody>
          </table>
        </div>
        <form className='mt-10 flex w-4/5 items-center justify-between'>
          <h1 className='tableTextHeader'>Edit Saldo Kamu</h1>
          <input
            type='text'
            className='h-10 w-72 rounded-lg p-3'
            onChange={(e) => handleChange(e)}
          />
          <div className='flex items-center justify-end'>
            <button className='btn' onClick={handleEditBalance}>
              Edit Saldo
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Dashboard
