import type { FC } from 'react'
import { NumericFormat } from 'react-number-format'
import { useSelector } from 'react-redux'
import { Toaster, toast } from 'sonner'

import { useAppDispatch } from '@/hooks/store'
import { BalanceReducerState, setBalance } from '@/reducers/balanceSlice'
import { buyItemThunk } from '@/reducers/cartSlice'
import { Catalog } from '@/types/api'

import CartItem from './CartItem'

type CartType = {
  cart: {
    cart: Catalog[]
  }
}

const Cart: FC = () => {
  const cart = useSelector((state: CartType) => state.cart.cart)
  const balance = useSelector((state: BalanceReducerState) => state.balance)
  const dispatch = useAppDispatch()

  const total = cart.reduce((total, item) => {
    return total + item.price * item.qty
  }, 0)

  const buy = () => {
    if (balance >= total) {
      dispatch(buyItemThunk())
      dispatch(setBalance(balance - total))
      return toast.success('Pembayaran berhasil!')
      //   dispatch(setBalance(balance - total))
    } else return toast.error('Uang kamu tidak cukup!')
  }

  console.log(cart)
  return (
    <>
      <Toaster position='top-center' richColors />
      <div className='mt-5 flex justify-center'>
        <div className='mainPage'>
          <div className='h-full w-4/5'>
            <h1 className='p-5 font-extrabold text-green-700/70'>
              Keranjang Kamu
            </h1>
            <div className='relative overflow-auto'>
              <table className='table'>
                <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
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
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-12 flex h-16 justify-center'>
        <div className='mainPage'>
          <div>
            <button className='btn font-bold' onClick={buy}>
              Bayar Sekarang
            </button>
          </div>
          <div>
            <h1>
              Total Harga:
              <span className='text-green-600'>
                <NumericFormat
                  value={total}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp'}
                  renderText={(value) => <span> {value}</span>}
                />
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
