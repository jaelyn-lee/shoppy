import { Link } from 'react-router-dom'
import { BsBagHeart } from 'react-icons/bs'
import { login, logout } from '../api/firebase'
import { useState } from 'react'
import { User } from '../types/user'

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null)
  const handleLogin = () => {
    login().then((user: User) => setUser(user))
  }
  const handleLogout = () => {
    logout().then(setUser(null))
  }

  return (
    <header className="flex justify-between border-b border-grey-300 p-2">
      <Link
        to={'/'}
        className="flex items-center text-4xl text-main gap-2 font-semibold"
      >
        <BsBagHeart />
        <h1>Shoppy</h1>
      </Link>

      <nav className="flex items-center gap-4">
        <Link to={'/products'}>Products</Link>
        <Link to={'/carts'}>Cart</Link>
        <Link to={'/products/new'}>Edit</Link>
        {!user ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <>
            <img src={user.photoURL} alt="user photo" />
            <p>{user.displayName}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  )
}
