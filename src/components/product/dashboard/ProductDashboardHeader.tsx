import Button from '@/components/ui/Button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { Download, FileText, Plus } from 'lucide-react'
import FormDialog from './table/section/FormDialog'

export default function ProductDashboardHeader() {
  return (
    <div className='flex items-center justify-between py-5'>
      <h1 className='font-semibold text-2xl'>Product List</h1>

      <div className='flex gap-3'>
        <Button className='flex items-center justify-center gap-1 bg-white'>
          <Download size={16} />
          Import
        </Button>
        <Button className='flex items-center justify-center gap-1 bg-white'>
          <FileText size={16} />
          Export
        </Button>

        <Dialog>
          <DialogTrigger>
            <div className='button flex items-center justify-center gap-1 bg-black border-0'>
              <Plus size={16} color='white' />
              <span className='text-white'>Add Product</span>
            </div>
          </DialogTrigger>
          <DialogContent className='px-4 py-5' showCloseButton={false}>
            <FormDialog />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
