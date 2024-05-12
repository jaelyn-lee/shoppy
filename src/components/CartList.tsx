import { useEffect, useState } from 'react'
import { Product } from '../types/product'
import { IoTrashBinOutline } from 'react-icons/io5'
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci'
import { FaPlus, FaEquals } from 'react-icons/fa'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { deleteProductByProductId, emptyCart } from '../api/firebase'
import { useAuthContext } from '../context/AuthContext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CartList(selectedProducts: any) {
  const products = selectedProducts.products
  const [itemCounts, setItemCounts] = useState<{ [id: string]: number }>({})
  const [total, setTotal] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { uid }: any = useAuthContext()

  const handleIncrement = (productId: string) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }))
  }

  const handleDecrement = (productId: string) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max((prevCounts[productId] || 0) - 1, 0),
    }))
  }

  //TO DO: Enable Delete button so that products can be deleted from cart.
  const handleDelete = () => {
    deleteProductByProductId(uid, products.Id)
    alert('Item has been deleted from the cart.')
  }

  useEffect(() => {
    let sum = 0
    for (const product of products) {
      sum += itemCounts[product.id] * product.price
    }
    setTotal(sum)
  }, [itemCounts, products])

  useEffect(() => {
    if (products.length > 0) {
      setTotalPayment(total + 7)
    }
  }, [products.length, total])

  return (
    <div>
      <h1 className="text-center font-semibold text-xl border-b border-gray-200 py-3 mb-4">
        My Cart
      </h1>
      <ul className="flex flex-col px-32 gap-3 mb-5">
        {products.map((product: Product, index: number) => (
          <div className="flex my-2 justify-between border-b border-gray-100 pb-2">
            <li key={index} className="flex justify-between items-center">
              <img
                src={product.image}
                alt={product.productName}
                className="w-44 rounded-lg mr-8"
              />
              <div className="flex flex-col">
                <p className="font-bold">{product.productName}</p>
                <p className="text-main font-semibold">{product.options}</p>
                <p>NZ$ {product.price}</p>
              </div>
            </li>
            <div className="flex items-center">
              <button
                onClick={() => handleDecrement(product.id)}
                className="text-lg"
              >
                <CiSquareMinus />
              </button>
              <p className="text-lg">{product.quantity}</p>
              <button
                onClick={() => handleIncrement(product.id)}
                className="text-lg"
              >
                <CiSquarePlus />
              </button>
              <button onClick={handleDelete} className="text-lg ml-1">
                <IoTrashBinOutline />
              </button>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex gap-10 items-center justify-center">
        <div className="flex flex-col w-40 h-16 text-center items-center justify-center bg-background rounded-xl">
          <p>Total item price</p>
          <p className="font-semibold text-main text-lg"> NZ$ {total || 0}</p>
        </div>
        <p>
          <FaPlus />
        </p>
        <div className="flex flex-col w-40 h-16 text-center items-center justify-center bg-background rounded-xl">
          <p>Shipping fee</p>
          <p className="font-semibold text-main text-lg">
            {products.length > 0 ? 'NZ$ 7.00' : 'NZ$ 0'}
          </p>
        </div>
        <p>
          <FaEquals />
        </p>
        <div className="flex flex-col w-40 h-16 text-center items-center justify-center bg-background rounded-xl">
          <p>Total Payment price</p>
          <p className="font-semibold text-main text-lg">
            NZ$ {totalPayment || '0'}
          </p>
        </div>
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
    </div>
  )
}
