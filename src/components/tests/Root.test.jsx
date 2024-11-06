import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Root from '../../root.jsx'
import { CartProvider } from '../SharedData/CartContext.jsx'

// Mock the Cart component
vi.mock('../Cart/Cart.jsx', () => ({
  default: () => <div data-testid='cart-component'>Cart Content</div>,
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

  it('displays the cart icon with the correct quantity', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Root />
        </CartProvider>
      </MemoryRouter>
    )

    // Check for the cart icon and quantity
    const cartNumber = screen.getByText('0')
    expect(cartNumber).toBeInTheDocument()
  })

  it('toggles cart visibility when cart button is clicked', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Root />
        </CartProvider>
      </MemoryRouter>
    )

    // Find the cart button and click it
    const cartButton = screen.getByRole('button')
    fireEvent.click(cartButton)

    // Check if the cart is visible
    expect(screen.getByTestId('cart-component')).toHaveClass('visible')
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
