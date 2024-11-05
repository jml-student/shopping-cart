import { useCart } from '../SharedData/CartContext.jsx'
import { Link } from 'react-router-dom'
import './cart.css'

export default function Cart() {
  const { cartProducts, setCartProducts, setShowCart } = useCart()

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
        <button className='close-cart'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <title>close-circle-outline</title>
            <path d='M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z' />
          </svg>
        </button>
      </div>
      <ul>
        {cartProducts.length === 0 ? (
          <div className='cart-empty'>Your cart is empty</div>
        ) : (
          cartProducts.map((product) => {
            return (
              <div key={product.id} className='cart-product'>
                <img src={product.image} alt={product.title} />
                <div className='cart-product-info'>
                  <li>{product.title}</li>
                  <div className='cart-btn-cont'>
                    <button
                      onClick={() => removeItem(product.id)}
                      className='btn-remove'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <title>minus-circle</title>
                        <path d='M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' />
                      </svg>
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() => addItem(product.id)}
                      className='btn-add'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <title>plus-circle</title>
                        <path d='M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' />
                      </svg>
                    </button>
                    <span className='cart-price'>
                      $ {product.price * product.quantity}
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        )}
        {cartProducts.length > 0 ? (
          <button className='btn-checkout' onClick={() => setShowCart(false)}>
            <Link to={'/checkout'}>Checkout</Link>
          </button>
        ) : undefined}
      </ul>
    </div>
  )
}
