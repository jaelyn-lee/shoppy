import { useState } from 'react'
import { Product } from '../types/product'

export default function CartList(selectedProducts: any) {
  const products = selectedProducts.products
  const [count, setCount] = useState(1)
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
              <button onClick={() => setCount((prev) => prev + 1)}>+</button>
              <p>{count}</p>
              <button onClick={() => setCount((prev) => prev - 1)}>-</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}
