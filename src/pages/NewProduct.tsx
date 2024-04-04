import { useState } from 'react'
import { Product } from '../types/product'
import Button from '../ui/Button'
import { addNewProduct } from '../api/firebase'

export default function NewProduct() {
  const initialProduct = {
    productName: '',
    price: 0,
    category: '',
    productDescription: '',
    option: '',
  }
  const [product, setProduct] = useState<Product>(initialProduct)
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //Add new product to firebase
    try {
      await addNewProduct(product)
      console.log('New product is successfully added to firebase DB.')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProduct = { ...product, [e.target.name]: e.target.value }
    setProduct(newProduct)
    setProduct(initialProduct)
    console.log('new product!: ', product)
  }
  return (
    <section className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-2xl font-semibold">Add new product</h1>
      <form>
        <div>
          <button>Choose file</button>
          <input
            type="text"
            name=""
            onChange={handleChange}
            placeholder="no file added"
          />
        </div>
        <div>
          <input
            type="text"
            name="product-name"
            placeholder="Product name"
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="number" name="price" placeholder="Price" />
        </div>
        <div>
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="product-description"
            placeholder="Product Description"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="option"
            placeholder="Option"
            onChange={handleChange}
          />
        </div>
        <Button text="Add New Product" type="submit" onClick={handleSubmit} />
      </form>
    </section>
  )
}
