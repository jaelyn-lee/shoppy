import { createContext, useContext, useEffect, useState } from 'react'
import { login, logout, onUserStateChanged } from '../../api/firebase'
import { User } from 'firebase/auth'

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onUserStateChanged((user: User) => {
      setUser(user)
    })
  }, [])
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
