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
  const [file, setFile] = useState<File | null>(null)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //Upload product image to Cloudinary and get URL
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
    //DOC: File이라는 key를 가진 input이 있을 경우, files를 업데이트하고 setProduct를 업데이트하지 못하도록 return 해줌
    if (e.target.name === 'file') {
      setFile(e.target.files && e.target.files[0])
      return
    }
    setProduct(newProduct)
    console.log('new product!: ', product)
  }
  return (
    <section className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-2xl font-semibold">Add new product</h1>
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="product"
          className="h-80 my-4"
        />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            accept="image/*"
            name="file"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="productName"
            value={product.productName ?? ''}
            placeholder="Product name"
            required
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
            value={product.category ?? ''}
            placeholder="Category"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="productDescription"
            value={product.productDescription ?? ''}
            placeholder="Product Description"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="option"
            value={product.option ?? ''}
            placeholder="Option"
            required
            onChange={handleChange}
          />
        </div>
        <Button text="Add New Product" type="submit" />
      </form>
    </section>
  )
}
