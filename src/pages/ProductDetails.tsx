import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../ui/Button'
import { addItemToCart } from '../api/firebase'
import { useAuthContext } from '../components/context/AuthContext'

export default function ProductDetails() {
  const { user } = useAuthContext()
  const userId = user.uid

  const location = useLocation()
  const product = location.state?.product
  const [selected, setSelected] = useState(
    product.options && product.options[0]
  )
  const [selectedProduct, setSelectedProduct] = useState(product)
  const [success, setSuccess] = useState<string | null>(null)
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setSelected(e.target.value)
    setSelectedProduct({ ...product, options: e.target.value })
  }
  const handleClick = () => {
    addItemToCart(selectedProduct, userId).then(() => {
      setSuccess('✅ Item added to cart!')
      setTimeout(() => {
        setSuccess(null)
      }, 4000)
    })
    console.log('add to cart')
  }
  return (
    <>
      <p>{product.category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img
          src={product.image}
          alt={product.productName}
          className="w-full basis-7/12 px-4"
        />
        <div className="w-full basis-5/12 flex flex-col px-4">
          <div className="flex items-center justify-between border-b border-gray-400">
            <h1 className="font-bold text-3xl py-2">{product.productName}</h1>
            <p className="text-lg font-semibold py-2">NZ$ {product.price}</p>
          </div>
          <p className="py-4 text-base">{product.productDescription}</p>
          <div className="flex items-center justify-start">
            <label htmlFor="select" className="text-main font-bold">
              Option:
            </label>
            <select
              id="select"
              onChange={handleSelect}
              value={selected}
              className="p-2 m-4 flex-1 border-2 border-dashed border-main outline-none"
            >
              {product.options &&
                product.options.map((option: string, index: number) => {
                  return <option key={index}>{option}</option>
                })}
            </select>
          </div>
          {success && <p>{success}</p>}
          <Button text={'Add to cart'} onClick={handleClick} />
        </div>
      </section>
    </>
  )
}
