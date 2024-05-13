import { IoCartOutline } from 'react-icons/io5'
import useCarts from '../../hooks/useCarts'

export default function CartStatus() {
  const {
    cartsQuery: { isLoading, error, data },
  } = useCarts()

  return (
    <>
      {isLoading && <p>Loading</p>}
      {error && <p>Error</p>}
      <div className="relative">
        <IoCartOutline className="text-4xl" />
        {data && (
          <p className="w-6 h-6 text-center bg-main text-white rounded-full absolute -top-2 -right-2">
            {data.length}
          </p>
        )}
      </div>
    </>
  )
}
