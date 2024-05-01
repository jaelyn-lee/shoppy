import { useLocation } from 'react-router-dom'

export default function ProductDetails() {
  const location = useLocation()
  const product = location.state?.product

  return (
    <section>
      <img src={product.image} alt={product.productName} className="w-1/3" />
      <h1>{product.productName}</h1>
      <p>{product.productDescription}</p>
      <p>NZ$ {product.price}</p>
    </section>
  )
}
