import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ProductDetails() {
  const location = useLocation()
  const product = location.state?.product
  const [selected, setSelected] = useState(
    product.options && product.options[0]
  )
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value)
  }
  return (
    <section>
      <img src={product.image} alt={product.productName} className="w-1/3" />
      <h1>{product.productName}</h1>
      <p>{product.productDescription}</p>
      <p>NZ$ {product.price}</p>
      <p>Option:</p>
      <select onChange={handleSelect} value={selected}>
        {product.options &&
          product.options.map((option: string, index: number) => {
            return <option key={index}>{option}</option>
          })}
      </select>
    </section>
  )
}
