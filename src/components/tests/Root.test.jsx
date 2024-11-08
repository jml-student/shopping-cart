import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Root from '../../root.jsx'
import { CartProvider } from '../SharedData/CartContext.jsx'

// Mock the Cart component
vi.mock('../Cart/Cart.jsx', () => ({
  default: () => <div data-testid='cart-component'></div>,
}))

describe('Root Component', () => {
  it('renders the header and navigation links', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Root />
        </CartProvider>
      </MemoryRouter>
    )

    // Check if header elements are in the document
    expect(screen.getByText('Stitch & Style')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Shop')).toBeInTheDocument()
  })

  it('displays the cart button with the correct quantity', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Root />
        </CartProvider>
      </MemoryRouter>
    )

    // Check for the cart button and quantity
    const cartNumber = screen.getByText('0')
    expect(cartNumber).toBeInTheDocument()
  })

  it('handles scroll behavior for header visibility', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Root />
        </CartProvider>
      </MemoryRouter>
    )

    // Simulate scrolling down
    fireEvent.scroll(window, { target: { scrollY: 100 } })

    // Check if the header is hidden
    expect(
      screen.getByRole('heading', { name: 'Stitch & Style' }).parentElement
    ).not.toHaveClass('visible')

    // Simulate scrolling up
    fireEvent.scroll(window, { target: { scrollY: 50 } })

    // Check if the header is visible again
    expect(
      screen.getByRole('heading', { name: 'Stitch & Style' }).parentElement
    ).toHaveClass('visible')
  })
})
