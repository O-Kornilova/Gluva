import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button title='Click me' />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button title='Click' onClick={handleClick} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<Button title='Button' containerClass='custom-class' />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button title='Disabled' disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders with left icon', () => {
    const Icon = () => <span data-testid='left-icon'>←</span>
    render(<Button title='Button' leftIcon={<Icon />} />)
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })
})
