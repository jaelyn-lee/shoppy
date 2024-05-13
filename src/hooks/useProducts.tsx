import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addNewProduct, getAllProducts } from '../api/firebase'
import { Product } from '../types/product'

type AddNewProductProp = {
  product: Product
  imageUrl: string
}

export default function useProducts() {
  const queryClient = useQueryClient()

  const productsQuery = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
    staleTime: 1000 * 60 * 1,
  })

  const addProduct = useMutation({
    mutationFn: ({ product, imageUrl }: AddNewProductProp) =>
      addNewProduct(product, imageUrl),
    onSuccess: () => queryClient.invalidateQueries(['products']),
  })
  return { productsQuery, addProduct }
}
