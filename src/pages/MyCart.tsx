import { useNavigate } from 'react-router-dom'
import useCarts from '../hooks/useCarts'
import { SelectedProduct } from '../types/product'
import CartProduct from '../components/CartProduct'
import PriceCard from '../components/ui/PriceCard'
import { FaEquals, FaPlus } from 'react-icons/fa'
import Button from '../ui/Button'

const shippingFee = 7

export default function MyCart() {
  const navigate = useNavigate()
  const {
    cartsQuery: { data: products, isLoading, error },
    emptyCart,
  } = useCarts()
  const hasProducts = products && products?.length > 0
  const totalPrice =
    products &&
    products.reduce(
      (prev: number, current: { price: number; quantity: number }) => {
        console.log('Prev: ', prev, 'Current: ', current)
        console.log(current.price, typeof current.price)
        console.log(current.quantity, typeof current.quantity)

        prev + current.price * current.quantity
      }
    )

  if (isLoading) return <p>...loading</p>
  if (error) return <p>Error: {error.message}</p>
  console.log(totalPrice)

  return (
    <div>
      <h1 className="text-center font-semibold text-xl border-b border-gray-200 py-3 mb-4">
        My Cart
      </h1>
      {!hasProducts && (
        <p className="text-center text-lg">Your cart is empty.</p>
      )}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product: SelectedProduct) => (
                <CartProduct product={product} key={product.id} />
              ))}
          </ul>
          <div className="flex gap-10 items-center justify-center">
            <PriceCard text={'Total item price'} price={totalPrice} />
            <p>
              <FaPlus className="shrink-0" />
            </p>
            <PriceCard
              text={'Shipping fee'}
              price={products?.length > 0 ? shippingFee : 'NZ$ 0'}
            />
            <p>
              <FaEquals className="shrink-0" />
            </p>
            <PriceCard
              text={'Total Payment price'}
              price={products?.length > 0 ? totalPrice + shippingFee : 'NZ$ 0'}
            />
          </div>
          <div className="text-center mt-4">
            <Button
              text={'Place Order'}
              onClick={() => {
                alert('Order has been placed.')
                navigate('/')
                emptyCart()
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
