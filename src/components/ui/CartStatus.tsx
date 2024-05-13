import { IoCartOutline } from 'react-icons/io5'
import { useAuthContext } from '../../context/AuthContext'
import { getCartsByUserId } from '../../api/firebase'
import { useQuery } from '@tanstack/react-query'
import { SelectedProduct } from '../../types/product'

export default function CartStatus() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { uid }: any = useAuthContext()
  const { data }: SelectedProduct = useQuery({
    queryKey: ['carts'],
    queryFn: () => getCartsByUserId(uid),
  })
  console.log('product from cart status', data)

  return (
    <div className="relative">
      <IoCartOutline className="text-4xl" />
      {data && (
        <p className="w-6 h-6 text-center bg-main text-white rounded-full absolute -top-2 -right-2">
          {data.length}
        </p>
      )}
    </div>
  )
}
