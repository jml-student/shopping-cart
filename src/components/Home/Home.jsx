import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
        prevIndex === carouselProducts.length - 1 ? 0 : prevIndex + 1
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
          <div className='left-button' onClick={handlePrevious}>
            L
          </div>
          {carouselProducts.length > 0 && (
            <div className='carousel-item'>
              <img
                src={carouselProducts[carouselIndex].image}
                alt={carouselProducts[carouselIndex].title}
                className='carousel-image'
              />
              <div className='carousel-price'>
                <h2>${carouselProducts[carouselIndex].price}</h2>
              </div>
            </div>
          )}
          <div className='right-button' onClick={handleNext}>
            R
          </div>
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
