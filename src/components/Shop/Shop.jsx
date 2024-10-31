import { useLoaderData } from 'react-router-dom'
import { useCart } from '../SharedData/CartContext.jsx'

export default function Shop() {
  const { products } = useLoaderData()
  const { setCartProducts } = useCart()
  return (
    <div>
      {products.map((product) => {
        return (
          <div className='product' key={product.id}>
            <img src={product.image} alt={product.title} />
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <h2>{product.price}</h2>
            <button
              className='btn-add-to-cart'
              onClick={() => setCartProducts((prev) => [...prev, product])}
            >
              Add to cart
            </button>
          </div>
        )
      })}
    </div>
  )
}
