import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { router } from './App'
import { RouterProvider } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

import './index.css'

import CartProvider from './contexts/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
