import ProductDashboardHeader from '@/components/product/dashboard/ProductDashboardHeader'
import ProductDashboardTable from '@/components/product/dashboard/table/ProductDashboardTable'

export default function ProductDashboardPage() {
  return (
    <div className='container mx-auto py-5'>
      <ProductDashboardHeader />
      <ProductDashboardTable />
    </div>
  )
}
