import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../api/firebase'
import { Product } from '../types/product'
import ProductCard from './ui/ProductCard'

export default function Products() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery<Product[]>({ queryKey: ['products'], queryFn: getAllProducts })
  console.log(products)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <ul className="flex">
      {products &&
        products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </ul>
  )
}
