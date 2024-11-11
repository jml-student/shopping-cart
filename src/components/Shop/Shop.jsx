import { useLoaderData } from 'react-router-dom'
import { useCart } from '../SharedData/CartContext.jsx'
import './shop.css'

export async function shopLoader() {
  const products = []
  for (let i = 1; i <= 12; i++) {
    const response = await fetch(`https://fakestoreapi.com/products/${i}`)
    const product = await response.json()
    product.quantity = 1
    products.push(product)
  }
  return { products }
}

export default function Shop() {
  const { products } = useLoaderData()
  const { cartProducts, setCartProducts } = useCart()

  const addToCart = (product) => {
    const existingProductIndex = cartProducts.findIndex(
      (cartProduct) => cartProduct.id === product.id
    )

    if (existingProductIndex !== -1) {
      const updatedCartProducts = cartProducts.map((cartProduct, index) =>
        index === existingProductIndex
          ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
          : cartProduct
      )
      setCartProducts(updatedCartProducts)
    } else {
      setCartProducts([...cartProducts, product])
    }
  }

  return (
    <div className='products-container'>
      {products.map((product) => {
        return (
          <div className='product' key={product.id}>
            <img src={product.image} alt={product.title} />
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <h2>${product.price}</h2>
            <button
              className='btn-add-to-cart'
              onClick={() => addToCart(product)}
            >
              Add to cart
            </button>
          </div>
        )
      })}
    </div>
  )
}
