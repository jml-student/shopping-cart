import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './home.css'

export default function Home() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [carouselProducts, setCarouselProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const products = []
        for (let i = 1; i <= 6; i++) {
          const response = await fetch(`https://fakestoreapi.com/products/${i}`)
          const product = await response.json()
          products.push(product)
        }
        setCarouselProducts(products)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => {
        return prevIndex === carouselProducts.length - 1 ? 0 : prevIndex + 1
      })
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [carouselProducts])

  const handlePrevious = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? carouselProducts.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCarouselIndex((prevIndex) => {
      prevIndex === carouselProducts.length - 1 ? 0 : prevIndex + 1
    })
  }

  return (
    <div className='home-container'>
      <h1>Welcome to Stitch & Style</h1>
      <p>Shop now and get 10% off your order</p>
      <div className='carousel-container'>
        <div className='carousel'>
          <button className='left-button' onClick={handlePrevious}>
            L
          </button>
          {carouselProducts.length > 0 && (
            <div className='carousel-item'>
              <div className='carousel-image'>
                <img
                  src={carouselProducts[carouselIndex].image}
                  alt={carouselProducts[carouselIndex].title}
                />
              </div>
              <div className='carousel-price'>
                <h2>${carouselProducts[carouselIndex].price}</h2>
              </div>
            </div>
          )}
          <button className='right-button' onClick={handleNext}>
            R
          </button>
        </div>
        <div className='dots'>
          {carouselProducts.map((_, index) => {
            return (
              <span
                className={`dot ${index === carouselIndex ? 'active' : ''}`}
                onClick={() => setCarouselIndex(index)}
                key={index}
              >
                o
              </span>
            )
          })}
        </div>
      </div>
      <div className='shop-now'>
        <Link to={'/shop'}>Shop Now</Link>
      </div>
    </div>
  )
}
