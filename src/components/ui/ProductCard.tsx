import { Product } from '../../types/product'

export default function ProductCard({ key, product }) {
  return (
    <li key={key}>
      <img src={product.image} alt={product.productName} />
      <p>{product.productName}</p>
      <p>NZ$ {product.price}</p>
      <p>{product.category}</p>
      {/* <p>
        {product.option.map((op: string) => (
          <span>{op}</span>
        ))}
      </p> */}
    </li>
  )
}
