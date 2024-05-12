import { useQuery } from '@tanstack/react-query'
import { getCartsByUserId } from '../api/firebase'
import { useAuthContext } from '../context/AuthContext'
import { Product } from '../types/product'
import CartList from '../components/CartList'

export default function MyCart() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { uid }: any = useAuthContext()
  const {
    data: selectedProducts,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ['cart', uid],
    queryFn: () => getCartsByUserId(uid),
  })

  if (isLoading) return <p>...loading</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <CartList products={selectedProducts} />
    </>
  )
}
