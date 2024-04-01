import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.tsx'
import AllProducts from './pages/AllProducts.tsx'
import NewProduct from './pages/NewProduct.tsx'
import ProductDetails from './pages/ProductDetails.tsx'
import MyCart from './pages/MyCart.tsx'
import NotFound from './pages/NotFound.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: 'products',
        element: <AllProducts />,
      },
      {
        path: 'products/new',
        element: <NewProduct />,
      },
      {
        path: 'products/:id',
        element: <ProductDetails />,
      },
      {
        path: 'carts',
        element: <MyCart />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
