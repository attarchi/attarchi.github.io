import { render } from '../test-utils'
import { screen } from '@testing-library/react'

describe('Test Utilities', () => {
  it('renders children with custom render function', () => {
    const TestComponent = () => <div>Test Content</div>
    render(<TestComponent />)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('preserves testing-library exports', () => {
    expect(screen).toBeDefined()
    expect(render).toBeDefined()
  })
}) 