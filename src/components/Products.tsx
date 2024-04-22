import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../api/firebase'
import { Product } from '../types/product'
import ProductCard from './ui/ProductCard'

export default function ProductsList() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery<Product[]>({ queryKey: ['products'], queryFn: getAllProducts })
  console.log(products)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <ul className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products &&
        products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </ul>
  )
}
