import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci'
import {
  addOrUpdateProductToCart,
  deleteProductByProductId,
} from '../api/firebase'
import { SelectedProduct } from '../types/product'
import { IoTrashBinOutline } from 'react-icons/io5'

type CartItem = {
  product: SelectedProduct
  uid: string
}
const ICON_CLASS =
  'text-2xl transition-all cursor-pointer hover:text-main hover:scale-105 mx-1'

export default function CartProduct({ product, uid }: CartItem) {
  const handleIncrement = () => {
    addOrUpdateProductToCart(
      { ...product, quantity: product.quantity + 1 },
      uid
    )
  }

  const handleDecrement = () => {
    if (product.quantity < 2) return
    addOrUpdateProductToCart(
      { ...product, quantity: product.quantity - 1 },
      uid
    )
  }

  const handleDelete = () => {
    deleteProductByProductId(uid, product.id)
    alert('Item has been deleted from the cart.')
  }

  return (
    <li key={product.id} className="flex flex-col px-32 gap-3 mb-5">
      <div className="flex my-2 justify-between border-b border-gray-100 pb-2">
        <li className="flex justify-between items-center">
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
          <button onClick={() => handleDecrement()} className="text-lg">
            <CiSquareMinus className={ICON_CLASS} />
          </button>
          <p className="text-lg">{product.quantity}</p>
          <button onClick={() => handleIncrement()} className="text-lg">
            <CiSquarePlus className={ICON_CLASS} />
          </button>
          <button onClick={handleDelete} className="text-lg ml-1">
            <IoTrashBinOutline className={ICON_CLASS} />
          </button>
        </div>
      </div>
    </li>
  )
}
