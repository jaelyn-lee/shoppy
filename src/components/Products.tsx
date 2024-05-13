import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../api/firebase'
import { Product } from '../types/product'
import ProductCard from './ui/ProductCard'

export default function ProductsList() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 1,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <div className="grid grid-cols-4">
      {products &&
        products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  )
}
