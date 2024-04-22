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
      <img src={image} alt={productName} className="w-full" />
      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        <h3 className="truncate">{productName}</h3>
        <p>NZ$ {price}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
      {/* <p>
        {product.option.map((op: string) => (
          <span>{op}</span>
        ))}
      </p> */}
    </li>
  )
}
