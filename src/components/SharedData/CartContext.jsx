import { createContext, useContext, useState } from 'react'
import Proptypes from 'prop-types'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([])
  const [showCart, setShowCart] = useState(false)

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, showCart, setShowCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

CartProvider.propTypes = {
  children: Proptypes.node,
}
