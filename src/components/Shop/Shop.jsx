import { useState, useEffect } from 'react'
import Nav from '../Nav/Nav.jsx'

export default function Shop() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const products = Array.from({ length: 12 }, (_, i) =>
        fetch(`https://fakestoreapi.com/products/${i + 1}`).then((res) =>
          res.json()
        )
      )
      const data = await Promise.all(products)
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <Nav></Nav>
      {
        /*products.length === 12 &&*/
        products.map((product) => {
          return (
            <div key={product.id}>
              <img src={product.image} alt={product.title} />
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <h2>{product.price}</h2>
            </div>
          )
        })
      }
    </div>
  )
}
