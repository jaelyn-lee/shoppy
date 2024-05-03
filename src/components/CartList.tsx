import { useState } from 'react'
import { Product } from '../types/product'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CartList(selectedProducts: any) {
  const products = selectedProducts.products
  const [itemCounts, setItemCounts] = useState<{ [id: string]: number }>({})
  console.log(itemCounts)

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
  // const handleDelete = () => {
  //   deleteProductByProductId(userId, products.Id)
  // }

  return (
    <div>
      <h1>My Cart</h1>
      <ul>
        {products.map((product: Product, index: number) => (
          <div className="flex">
            <li key={index} className="flex justify-between">
              <p>{product.productName}</p>
              <img
                src={product.image}
                alt={product.productName}
                className="w-3/12"
              />
              <p>{product.price}</p>
              <p>{product.options}</p>
            </li>
            <div className="flex items-center">
              <button onClick={() => handleIncrement(product.id)}>+</button>
              <p>{itemCounts[product.id] || 1}</p>
              <button onClick={() => handleDecrement(product.id)}>-</button>
              <button
                onClick={() => console.log('Delete button is clicked 🗑️')}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}
