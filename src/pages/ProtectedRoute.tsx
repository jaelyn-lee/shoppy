import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../components/context/AuthContext'

type Props = {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function ProtectedRoute({ children, requireAdmin }: Props) {
  const { user } = useAuthContext()
  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />
  }
  return children
}
