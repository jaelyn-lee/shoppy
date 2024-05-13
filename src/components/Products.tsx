import { Product } from '../types/product'
import ProductCard from './ui/ProductCard'
import useProducts from '../hooks/useProducts'

export default function ProductsList() {
  const {
    productsQuery: { data: products, isLoading, error },
  } = useProducts()

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
