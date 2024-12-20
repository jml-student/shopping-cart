import { Outlet, Link } from 'react-router-dom'
import { useCart } from './components/SharedData/CartContext.jsx'
import { useState, useEffect } from 'react'
import Cart from './components/Cart/Cart.jsx'

export default function Root() {
  const { cartProducts, showCart, setShowCart } = useCart()
  const [headerVisible, setHeaderVisible] = useState('')
  const [lastScrollY, setLastScrollY] = useState(0)

  let cartLength = 0

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY === 0) {
        setHeaderVisible('')
      } else if (currentScrollY < lastScrollY) {
        setHeaderVisible('visible')
      } else if (currentScrollY > lastScrollY) {
        setHeaderVisible('invisible')
      }

      setLastScrollY(currentScrollY)
    }
    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <div
      className='container'
      onClick={showCart ? () => setShowCart(false) : undefined}
    >
      <div
        className={`header ${headerVisible === 'visible' ? 'visible' : headerVisible === 'invisible' ? 'invisible' : ''}`}
      >
        <h1 className='title'>Stitch & Style</h1>
        <nav>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/shop'}>Shop</Link>
            </li>
            <button
              className='btn-cart'
              onClick={(event) => {
                event.stopPropagation()
                setShowCart(!showCart)
              }}
            >
              <span className='cartNumber'>
                {cartProducts.map((product) => {
                  cartLength += product.quantity
                })}
                {cartLength}
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z' />
              </svg>
            </button>
          </ul>
        </nav>
      </div>
      <div id='detail'>
        <Outlet />
      </div>
      <div
        className={`cart ${showCart ? 'visible' : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <Cart />
      </div>
    </div>
  )
}
