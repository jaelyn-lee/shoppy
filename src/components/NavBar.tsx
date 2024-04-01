import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <header className="flex justify-between">
      <Link to={'/'}>
        <h1>Shoppy</h1>
      </Link>

      <nav>
        <Link to={'/products'}>Products</Link>
        <Link to={'/carts'}>Cart</Link>
        <Link to={'/products/new'}>Edit</Link>
        <button>Login</button>
      </nav>
    </header>
  )
}
