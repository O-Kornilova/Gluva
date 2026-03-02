import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from './ProductCard'
import { CartProvider } from '../../../context/CartContext'

const mockProduct = {
  src: '/test-image.jpg',
  title: 'Гливи',
  description: 'Свіжі гливи',
  pricePerKg: 120
}

const renderWithCart = component => {
  return render(<CartProvider>{component}</CartProvider>)
}

describe('ProductCard', () => {
  it('renders product information', () => {
    renderWithCart(<ProductCard {...mockProduct} />)

    expect(screen.getByText('Гливи')).toBeInTheDocument()
    expect(screen.getByText('Свіжі гливи')).toBeInTheDocument()
    expect(screen.getByText('120 ₴/кг')).toBeInTheDocument()
  })

  it('displays initial quantity of 0.5 kg', () => {
    renderWithCart(<ProductCard {...mockProduct} />)
    expect(screen.getByText('0.5 кг')).toBeInTheDocument()
    expect(screen.getByText('500 г')).toBeInTheDocument()
  })

  it('increases quantity when + button clicked', () => {
    renderWithCart(<ProductCard {...mockProduct} />)

    const increaseButton = screen.getByLabelText('Збільшити кількість')
    fireEvent.click(increaseButton)

    expect(screen.getByText('1 кг')).toBeInTheDocument()
  })

  it('decreases quantity when - button clicked', () => {
    renderWithCart(<ProductCard {...mockProduct} />)

    const increaseButton = screen.getByLabelText('Збільшити кількість')
    fireEvent.click(increaseButton)

    const decreaseButton = screen.getByLabelText('Зменшити кількість')
    fireEvent.click(decreaseButton)

    expect(screen.getByText('0.5 кг')).toBeInTheDocument()
  })

  it('disables decrease button at minimum quantity', () => {
    renderWithCart(<ProductCard {...mockProduct} />)

    const decreaseButton = screen.getByLabelText('Зменшити кількість')
    expect(decreaseButton).toBeDisabled()
  })

  it('calculates total price correctly', () => {
    renderWithCart(<ProductCard {...mockProduct} />)
    expect(screen.getByText('60 ₴')).toBeInTheDocument()
  })

  it('shows alert when order button clicked', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    renderWithCart(<ProductCard {...mockProduct} />)

    const orderButton = screen.getByText('Замовити')
    fireEvent.click(orderButton)

    expect(alertMock).toHaveBeenCalledWith('Додано в кошик: 0.5 кг')
    alertMock.mockRestore()
  })
})
