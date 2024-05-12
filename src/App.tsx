import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import { AuthContextProvider } from './context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthContextProvider>
        <NavBar />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App
