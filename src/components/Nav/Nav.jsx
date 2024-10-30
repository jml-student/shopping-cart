import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/shop'}>Shop</Link>
        </li>
        <button className='btc-cart'>Cart</button>
      </ul>
    </nav>
  )
}
