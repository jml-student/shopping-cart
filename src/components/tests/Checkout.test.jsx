import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Checkout from '../Checkout/Checkout.jsx'
import { useCart } from '../SharedData/CartContext.jsx'

// Mock useCart to simulate cart items
vi.mock('../SharedData/CartContext.jsx', () => ({
  useCart: vi.fn(),
}))

describe('Checkout Component', () => {
  beforeEach(() => {
    useCart.mockReturnValue({
      cartProducts: [
        {
          id: 1,
          title: 'Product 1',
          price: 15.99,
          quantity: 2,
        },
        {
          id: 2,
          title: 'Product 2',
          price: 25.0,
          quantity: 1,
        },
      ],
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the checkout page with products', () => {
    render(<Checkout />)

    // Check for the header
    expect(screen.getByText('Your Order')).toBeInTheDocument()

    // Check for products
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('x2')).toBeInTheDocument()
    expect(screen.getByText('$31.98')).toBeInTheDocument() // 15.99 * 2

    expect(screen.getByText('Product 2')).toBeInTheDocument()
    expect(screen.getByText('x1')).toBeInTheDocument()
    expect(screen.getByText('$25')).toBeInTheDocument() // 25.00 * 1
  })

  it('calculates and displays the total price', () => {
    render(<Checkout />)

    // Check for total price calculation
    expect(screen.getByText('Total: $56.98')).toBeInTheDocument()
  })

  it('renders the payment button', () => {
    render(<Checkout />)

    // Check for the payment button
    const paymentButton = screen.getByRole('button', { name: /Payment/i })
    expect(paymentButton).toBeInTheDocument()
  })
})
