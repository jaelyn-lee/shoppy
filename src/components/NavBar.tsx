import { Link } from 'react-router-dom'
import { BsBagHeart } from 'react-icons/bs'
import { login, logout, onUserStateChanged } from '../api/firebase'
import { useEffect, useState } from 'react'
import { User } from '../types/user'

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null)
  const admin = import.meta.env.VITE_ADMIN_UID

  useEffect(() => {
    onUserStateChanged(setUser)
  }, [])

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
        {user ? <Link to={'/carts'}>Cart</Link> : null}
        {user && admin === user.uid ? (
          <Link to={'/products/new'}>Edit</Link>
        ) : null}
        {!user ? (
          <button onClick={login}>Login</button>
        ) : (
          <>
            <img
              src={user.photoURL}
              alt="user photo"
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="hidden md:block">{user.displayName}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  )
}
