import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'

import { Catalog } from '@/types/api'

type DeleteModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  item: Catalog
  remove: (id: number) => void
}

const DeleteModal: FC<DeleteModalProps> = ({ open, setOpen, item, remove }) => {
  return (
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
            <div className='bg-white p-5 sm:p-6'>
              <div className='sm:flex sm:items-start lg:block'>
                <div className='flex flex-shrink-0 items-center gap-6 rounded-full bg-red-50 p-3'>
                  <div className='mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-200 sm:mx-0 sm:size-10'>
                    <ExclamationTriangleIcon
                      aria-hidden='true'
                      className='size-6 text-red-600'
                    />
                  </div>
                  <DialogTitle
                    as='h3'
                    className='text-base font-semibold text-gray-900'
                  >
                    Hapus barang {item.name}?
                  </DialogTitle>
                </div>
                <div className='mt-4 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <div className='mt-4 text-gray-600'>
                    <p>
                      Barang yang sudah dihapus tidak dapat dikembalikan lagi,
                      tindakan ini akan menghapus barang secara permanen.
                    </p>
                    <div className='mt-5 flex justify-around'>
                      <button
                        className='btn bg-gray-500 px-5 py-2 text-lg hover:bg-gray-600 focus:ring-gray-300'
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className='btn bg-red-500 px-5 py-2 text-lg hover:bg-red-600 focus:ring-red-300'
                        onClick={() => remove(item.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default DeleteModal
