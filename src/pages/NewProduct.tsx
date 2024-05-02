import { useState } from 'react'
import { Product } from '../types/product'
import Button from '../ui/Button'
import { addNewProduct } from '../api/firebase'
import { uploadImage } from '../api/cloudinary'

export default function NewProduct() {
  const initialProduct = {
    id: '',
    image: '',
    productName: '',
    price: 0,
    category: '',
    productDescription: '',
    options: [],
  }
  const [product, setProduct] = useState<Product>(initialProduct)
  const [file, setFile] = useState<object | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //Disabled button to show users the file is uploading
    setIsUploading(true)
    //Upload product image to Cloudinary and get URL
    uploadImage(file)
      .then((url) => {
        //Add new product to firebase
        addNewProduct(product, url).then(() => {
          //Show success message for 4 seconds
          setSuccess('New product added successfully.')
          setTimeout(() => {
            setSuccess(null)
          }, 4000)
        })
      })
      .finally(() => {
        setIsUploading(false)
        setProduct(initialProduct)
        setFile(null)
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProduct = { ...product, [e.target.name]: e.target.value }
    //DOC: File이라는 key를 가진 input이 있을 경우, files를 업데이트하고 setProduct를 업데이트하지 못하도록 return 해줌
    if (e.target.name === 'file') {
      setFile(e.target.files && e.target.files[0])
      return
    }
    setProduct(newProduct)
  }
  return (
    <section className="flex flex-col items-center justify-center mt-16">
      <h1 className="text-2xl font-bold mb-4">Add new product</h1>
      {success && <p>✅ {success}</p>}
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="product"
          className="h-80 my-4"
        />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
          className="w-[288px] mb-4"
        />
        <div className="flex flex-col mb-4">
          <label htmlFor="productName" className="mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={product.productName ?? ''}
            placeholder="Product name"
            required
            onChange={handleChange}
            className="border-4 border-main rounded-md w-72 p-1"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="price" className="mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            onChange={handleChange}
            className="border-4 border-main rounded-md w-72 p-1"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="category" className="mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={product.category ?? ''}
            placeholder="Category"
            required
            onChange={handleChange}
            className="border-4 border-main rounded-md w-72 p-1"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="productDescription" className="mb-2">
            Product Description
          </label>
          <input
            type="text"
            name="productDescription"
            value={product.productDescription ?? ''}
            placeholder="Product Description"
            required
            onChange={handleChange}
            className="border-4 border-main rounded-md w-72 p-1"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="options" className="mb-2">
            Option
          </label>
          <input
            type="text"
            name="options"
            value={product.options ?? ''}
            placeholder="Add comma (,) in between options."
            required
            onChange={handleChange}
            className="border-4 border-main rounded-md w-72 p-1"
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button
            text={isUploading ? 'Uploading...' : 'Upload file'}
            type="submit"
            disabled={isUploading}
          />
        </div>
      </form>
    </section>
  )
}
