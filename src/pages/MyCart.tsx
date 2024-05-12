import { useQuery } from '@tanstack/react-query'
import { getProductByUserId } from '../api/firebase'
import { useAuthContext } from '../components/context/AuthContext'
import { Product } from '../types/product'
import CartList from '../components/CartList'

export default function MyCart() {
  const { user } = useAuthContext()
  const {
    data: selectedProducts,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ['cart', user.uid],
    queryFn: () => getProductByUserId(user.uid),
  })

  if (isLoading) return <p>...loading</p>
  if (error) return <p>Error: {error.message}</p>

  console.log(selectedProducts)

  return (
    <>
      <CartList products={selectedProducts} />
    </>
  )
}
