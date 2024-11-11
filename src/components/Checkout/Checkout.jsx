import { useCart } from '../SharedData/CartContext.jsx'
import './checkout.css'

export default function Checkout() {
  const { cartProducts } = useCart()

  const totalPrice = () =>
    cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)

  return (
    <div className='checkout'>
      <div className='checkout-header'>
        <h1>Your Order</h1>
      </div>
      <ul className='checkout-container'>
        {cartProducts.map((product) => {
          return (
            <div key={product.id} className='checkout-product'>
              <img src={product.image} alt={product.title} />
              <div className='checkout-product-info'>
                <li>{product.title}</li>
                <span>x{product.quantity}</span>
                <span className='checkout-price'>
                  ${product.price * product.quantity}
                </span>
              </div>
            </div>
          )
        })}
        <div className='total-price'>Total: ${totalPrice().toFixed(2)}</div>
        <button className='btn-payment'>Payment</button>
      </ul>
    </div>
  )
}
