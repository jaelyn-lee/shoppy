import { getAllProducts } from '../api/firebase'

export default function AllProducts() {
  const products = getAllProducts()
  console.log(products)

  return (
    <div>{products && products.map((p) => <div key={p.id}>{p.name}</div>)}</div>
  )
}
