import { useCart } from '../SharedData/CartContext.jsx'

export default function Checkout() {
  const { cartProducts } = useCart()

  return (
    <div>
      <div className='checkout-header'>
        <h1>Your Order</h1>
      </div>
      <ul>
        {cartProducts.map((product) => {
          return (
            <div key={product.id} className='checkout-product'>
              <img src={product.image} alt={product.title} />
              <div className='checkout-product-info'>
                <li>{product.title}</li>
                <span>{product.quantity}</span>
                <span>{product.price * product.quantity}</span>
              </div>
            </div>
          )
        })}
        <button className='btn-payment'>Payment</button>
      </ul>
    </div>
  )
}
