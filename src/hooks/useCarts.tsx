import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteProductByProductId,
  getCartsByUserId,
  addOrUpdateProductToCart as modifyCart,
} from '../api/firebase'
import { Product, SelectedProduct } from '../types/product'
import { useAuthContext } from '../context/AuthContext'

export default function useCarts() {
  const queryClient = useQueryClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { uid }: any = useAuthContext()

  //Query carts item by using useQuery
  const cartsQuery = useQuery<Product[]>({
    queryKey: ['cart', uid || ''],
    queryFn: () => getCartsByUserId(uid),
    enabled: !!uid,
  })

  const addOrUpdateProductToCart = useMutation({
    mutationFn: (product: SelectedProduct) => modifyCart(product, uid),
    onSuccess: () => queryClient.invalidateQueries(['cart', uid]),
  })

  const removeItem = useMutation({
    mutationFn: (productId: string) => deleteProductByProductId(productId, uid),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', uid])
    },
  })
  return { cartsQuery, addOrUpdateProductToCart, removeItem }
}
