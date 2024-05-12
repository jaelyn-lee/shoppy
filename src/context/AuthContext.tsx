import { createContext, useContext, useEffect, useState } from 'react'
import { login, logout, onUserStateChanged } from '../api/firebase'
import { User } from '../types/user'
const AuthContext = createContext()

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onUserStateChanged((user: User) => {
      setUser(user)
    })
  }, [])
  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
