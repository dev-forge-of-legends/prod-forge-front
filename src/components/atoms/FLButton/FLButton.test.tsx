import { fireEvent, render, screen } from '@testing-library/react'
import FLButton from './FLButton'

describe('FLButton', () => {
  const mockOnClick = jest.fn()

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it('renders with children text', () => {
    render(<FLButton onClick={mockOnClick}>Click me</FLButton>)
    expect(screen.getByText('Click me')).toBeDefined()
  })

  it('calls onClick when clicked', () => {
    render(<FLButton onClick={mockOnClick}>Click me</FLButton>)
    fireEvent.click(screen.getByText('Click me'))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    render(<FLButton onClick={mockOnClick} disabled>Click me</FLButton>)
    fireEvent.click(screen.getByText('Click me'))
    expect(mockOnClick).not.toHaveBeenCalled()
  })

  it('shows loading spinner when loading is true', () => {
    render(<FLButton onClick={mockOnClick} loading>Click me</FLButton>)
    expect(screen.getByRole('button')).toBeDefined()
    // The loading spinner should be present (LoaderCircle component)
    expect(screen.getByRole('button').querySelector('svg')).toBeDefined()
  })

  it('does not show children when loading is true', () => {
    render(<FLButton onClick={mockOnClick} loading>Click me</FLButton>)
    expect(screen.queryByText('Click me')).toBeNull()
  })

  it('applies custom className', () => {
    render(<FLButton onClick={mockOnClick} className="custom-class">Click me</FLButton>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('custom-class')
  })

  it('applies disabled styles when disabled', () => {
    render(<FLButton onClick={mockOnClick} disabled>Click me</FLButton>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('opacity-50 cursor-not-allowed')
  })

  it('passes through additional props', () => {
    render(<FLButton onClick={mockOnClick} data-testid="custom-button">Click me</FLButton>)
    expect(screen.getByTestId('custom-button')).toBeDefined()
  })
})
