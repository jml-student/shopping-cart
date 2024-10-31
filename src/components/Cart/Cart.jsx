import { useCart } from '../SharedData/CartContext.jsx'
import './cart.css'

function Cart() {
  const { cartProducts } = useCart()

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <h1>Cart</h1>
      <ul>
        {cartProducts.map((product) => {
          return <li key={product}>{product.title}</li>
        })}
      </ul>
    </div>
  )
}

export default Cart
