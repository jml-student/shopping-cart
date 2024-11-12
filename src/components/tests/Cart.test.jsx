import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { useCart } from '../SharedData/CartContext.jsx'
import { beforeEach, afterEach } from 'vitest'
import Cart from '../Cart/Cart.jsx'

vi.mock('../SharedData/CartContext.jsx')

// Mock data for cart products
const mockCartProducts = [
  {
    id: 1,
    title: 'Product 1',
    price: 10,
    quantity: 3,
    image: 'product1.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 20,
    quantity: 1,
    image: 'product2.jpg',
  },
]

describe('Cart Component', () => {
  const mockSetCartProducts = vi.fn()
  const mockSetShowCart = vi.fn()

  beforeEach(() => {
    useCart.mockReturnValue({
      cartProducts: mockCartProducts,
      setCartProducts: mockSetCartProducts,
      setShowCart: mockSetShowCart,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders cart with products and total price', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    )

    expect(screen.getByText('Your Cart')).toBeInTheDocument()
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
    expect(screen.getByText('$ 30')).toBeInTheDocument() // Product 1 total price (10 * 2)
    expect(screen.getByText('$ 20')).toBeInTheDocument() // Product 2 total price
    expect(screen.getByText('Total: $50.00')).toBeInTheDocument() // Total price of all products
  })

  it('removes an item when remove button is clicked', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    )

    const removeButtons = screen.getAllByTitle('minus-circle')
    fireEvent.click(removeButtons[0])

    expect(mockSetCartProducts).toHaveBeenCalledWith([
      { ...mockCartProducts[0], quantity: 2 },
      mockCartProducts[1],
    ])
  })

  it('adds an item when add button is clicked', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    )

    const addButtons = screen.getAllByTitle('plus-circle')
    fireEvent.click(addButtons[0])

    expect(mockSetCartProducts).toHaveBeenCalledWith([
      { ...mockCartProducts[0], quantity: 4 },
      mockCartProducts[1],
    ])
  })

  it('displays "Your cart is empty" when no items are in cart', () => {
    useCart.mockReturnValue({
      cartProducts: [],
      setCartProducts: mockSetCartProducts,
      setShowCart: mockSetShowCart,
    })

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    )

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.queryByText('Total:')).not.toBeInTheDocument()
  })

  it('closes cart when close button is clicked', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    )

    const closeButton = screen.getByTitle('close-circle-outline')
    fireEvent.click(closeButton)

    expect(mockSetShowCart).toHaveBeenCalledWith(false)
  })

  it('navigates to checkout when checkout button is clicked', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    )

    const checkoutButton = screen.getByRole('button', { name: 'Checkout' })
    fireEvent.click(checkoutButton)

    expect(mockSetShowCart).toHaveBeenCalledWith(false)
  })
})
