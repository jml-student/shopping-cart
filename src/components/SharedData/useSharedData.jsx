import { useState } from 'react'

export const useSharedData = () => {
  const [cartProducts, setCartProducts] = useState([])

  return { cartProducts, setCartProducts }
}
