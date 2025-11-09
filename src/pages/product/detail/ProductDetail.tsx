import { useParams } from 'react-router'

import { useGetProductDetail } from '@/services/queries/useGetProductDetail'

type ProductFields = 'name' | 'reviews' | 'rating'

function ProductDetail() {
  const params = useParams()
  const productId = params.id! // Non-null assert soalx default ud pasti ada

  const { data, isLoading, error } = useGetProductDetail(productId)

  const getProductField = (field: ProductFields) => {
    if (isLoading) {
      return 'Loading...'
    } else if (error) {
      console.log(field)
      return `${field} not found`
    } else {
      if (field === 'rating' && data?.rating === null) return '-'
      if (field === 'reviews' && data?.reviews === null) return 'no'
      return data?.[field]
    }
  }

  return (
    <div className='container m-auto flex gap-4'>
      <figure className='size-96'>
        <img
          src={data?.imgUrl || '/no-image.jpg'}
          alt='Product Image'
          className='size-full'
        />
      </figure>

      <div className='flex max-w-96 flex-1 flex-col gap-4'>
        <span className='font-light'>User Name</span>
        <h1 className='text-5xl font-medium'>{getProductField('name')}</h1>
        <p>
          <span className='font-semibold'>
            {getProductField('rating')}/5 -&nbsp;
          </span>
          <span className='text-sm text-neutral-500'>
            {getProductField('reviews')} reviews
          </span>
        </p>
        <p>{data?.desc || 'No description'}</p>
      </div>
    </div>
  )
}

export default ProductDetail
