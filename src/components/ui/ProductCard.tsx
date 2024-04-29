import { Link } from 'react-router-dom'
import { Product } from '../../types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, image, productName, category, price } = product

  return (
    <li
      key={id}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={productName} className="w-full" />
      </Link>

      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        <h3 className="truncate">{productName}</h3>
        <p>NZ$ {price}</p>
      </div>
      <div className="flex items-center justify-between mb-2 px-2">
        <p className=" text-gray-600">{category}</p>
        <p className=" text-gray-600">
          {product.options.map((op: string) => (
            <span>{op} </span>
          ))}
        </p>
      </div>
    </li>
  )
}
