import { DefinedUseQueryResult } from '@tanstack/react-query'

export type Product = {
  id: string
  productName: string
  image: string
  price: number
  category: string
  productDescription: string
  options: string[]
}

export type SelectedProduct = {
  quantity: number
  id: string
  productName: string
  image: string
  price: number
  category: string
  productDescription: string
  options: string
}

export type CartItem = DefinedUseQueryResult<SelectedProduct[], Error>
