'use client'

// import { useRouter } from 'next/router'
// import { useNavigate } from 'react-router-dom'
// import { setSearchField } from '../redux/barangSlice'
// import '../styles/index.css'

const Search = () => {
  //   const dispatch = useDispatch()

  //   const nav = useRouter()

  //   const submit = (e) => {
  //     e.preventDefault()
  //     nav.push('/')
  //   }

  //   const searchField = (e) => {
  //     dispatch(setSearchField(e.target.value.toLocaleLowerCase()))
  //   }

  return (
    // <form className='w-96 focus:bg-green-500/50' onSubmit={submit}>
    <form className='w-96 focus:bg-green-500/50'>
      <label
        htmlFor='default-search'
        className='sr-only mb-2 text-sm font-medium text-gray-900 focus:bg-green-500/50'
      >
        Search
      </label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <svg
            aria-hidden='true'
            className='h-5 w-5 text-gray-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            ></path>
          </svg>
        </div>
        <input
          type='search'
          id='default-search'
          className='block w-full rounded-bl-lg rounded-br-lg bg-gray-100 p-4 pl-10 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500'
          placeholder='Sendok sup abad 17...'
          autoComplete='off'
          //   onChange={searchField}
        />
        <button type='submit' className='btn absolute bg-green-700'>
          Search
        </button>
      </div>
    </form>
  )
}

export default Search
