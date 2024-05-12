import { Link } from 'react-router-dom'
import { BsBagHeart } from 'react-icons/bs'
import Button from '../ui/Button'
import { useAuthContext } from '../context/AuthContext'
import CartStatus from './ui/CartStatus'

export default function NavBar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, login, logout }: any = useAuthContext()
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
        {user ? (
          <Link to={'/carts'}>
            <CartStatus />
          </Link>
        ) : null}
        {user && user.isAdmin ? <Link to={'/products/new'}>Edit</Link> : null}
        {!user ? (
          <Button onClick={login} text="Login" />
        ) : (
          <>
            <img
              src={user.photoURL}
              alt="user photo"
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="hidden md:block">{user.displayName}</span>
            <Button onClick={logout} text="Logout" />
          </>
        )}
      </nav>
    </header>
  )
}
