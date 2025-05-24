import { render, screen, fireEvent, waitFor } from '@testing-library/react'
jest.mock('react-syntax-highlighter')
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    return function MockComponent(props: any) {
      return <div>{props.label}</div>
    }
  }
}))

import ComponentPlayground from './ComponentPlayground'

describe('ComponentPlayground', () => {
  const mockComponent = {
    name: 'Button',
    variants: ['primary', 'secondary'],
    props: {
      label: { type: 'string', default: 'Click me' },
      disabled: { type: 'boolean', default: false }
    }
  }

  it('renders component preview with default props', async () => {
    render(<ComponentPlayground component={mockComponent} />)
    const preview = screen.getByTestId('component-preview')
    await waitFor(() => {
      expect(preview).toContainElement(screen.getByText('Click me'))
    })
  })

  it('allows prop modification through controls', async () => {
    render(<ComponentPlayground component={mockComponent} />)
    const labelInput = screen.getByLabelText(/label/i)
    fireEvent.change(labelInput, { target: { value: 'New Label' } })
    expect(labelInput).toHaveValue('New Label')
  })

  it('displays code example for current configuration', () => {
    render(<ComponentPlayground component={mockComponent} />)
    expect(screen.getByTestId('code-example')).toBeInTheDocument()
  })

  it('allows switching between variants', () => {
    render(<ComponentPlayground component={mockComponent} />)
    const variantSelect = screen.getByLabelText(/variant/i)
    fireEvent.change(variantSelect, { target: { value: 'secondary' } })
    expect(variantSelect).toHaveValue('secondary')
  })

  it('renders the actual component in preview', async () => {
    render(<ComponentPlayground component={mockComponent} />)
    await waitFor(() => {
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })
  })

  it('updates preview when props change', async () => {
    render(<ComponentPlayground component={mockComponent} />)
    const labelInput = screen.getByLabelText(/label/i)
    fireEvent.change(labelInput, { target: { value: 'New Label' } })
    await waitFor(() => {
      expect(screen.getByText('New Label')).toBeInTheDocument()
    })
  })
}) 