import { useCart } from '../SharedData/CartContext.jsx'
import './cart.css'

function Cart() {
  const { cartProducts, setCartProducts } = useCart()

  const removeItem = (id) => {
    const updatedCartProducts = cartProducts
      .map((cartProduct) => {
        if (cartProduct.id === id) {
          return cartProduct.quantity > 1
            ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
            : null
        }
        return cartProduct
      })
      .filter(Boolean)
    setCartProducts(updatedCartProducts)
  }

  const addItem = (id) => {
    const updatedCartProducts = cartProducts.map((cartProduct) =>
      cartProduct.id === id
        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
        : cartProduct
    )
    setCartProducts(updatedCartProducts)
  }

  return (
    <div>
      <div className='cart-header'>
        <h1>Your Cart</h1>
        <button className='close-cart'>X</button>
      </div>
      <ul>
        {cartProducts.map((product) => {
          return (
            <div key={product.id} className='cart-product'>
              <img src={product.image} alt={product.title} />
              <div className='cart-product-info'>
                <li>{product.title}</li>
                <button
                  onClick={() => removeItem(product.id)}
                  className='btn-remove'
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button onClick={() => addItem(product.id)} className='btn-add'>
                  +
                </button>
                <span>{product.price * product.quantity}</span>
              </div>
            </div>
          )
        })}
        <button className='btn-checkout'>Checkout</button>
      </ul>
    </div>
  )
}

export default Cart
