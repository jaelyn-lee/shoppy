import CartList from '../components/CartList'
import useCarts from '../hooks/useCarts'

export default function MyCart() {
  const {
    cartsQuery: { data: selectedProducts, isLoading, error },
  } = useCarts()

  if (isLoading) return <p>...loading</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <CartList products={selectedProducts} />
    </>
  )
}
