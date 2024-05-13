import { FaPlus, FaEquals } from 'react-icons/fa'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { emptyCart } from '../api/firebase'
import { useAuthContext } from '../context/AuthContext'
import PriceCard from './ui/PriceCard'
import CartProduct from './CartProduct'
import { SelectedProduct } from '../types/product'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CartList(selectedProducts: any) {
  const products = selectedProducts.products
  const shippingFee = 7
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { uid }: any = useAuthContext()
  const hasProducts = products && products.length > 0
  const totalPrice =
    products &&
    products.reduce(
      (prev: number, current: { price: string; quantity: number }) =>
        prev + parseInt(current.price) * current.quantity
    )

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
                <CartProduct uid={uid} product={product} key={product.id} />
              ))}
          </ul>
          <div className="flex gap-10 items-center justify-center">
            <PriceCard text={'Total item price'} price={totalPrice} />
            <p>
              <FaPlus />
            </p>
            <PriceCard
              text={'Shipping fee'}
              price={products.length > 0 ? shippingFee : 'NZ$ 0'}
            />
            <p>
              <FaEquals />
            </p>
            <PriceCard
              text={'Total Payment price'}
              price={products.length > 0 ? totalPrice + shippingFee : 'NZ$ 0'}
            />
          </div>
          <div className="text-center mt-4">
            <Button
              text={'Place Order'}
              onClick={() => {
                alert('Order has been placed.')
                navigate('/')
                emptyCart(uid)
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
