import { render, screen } from '@testing-library/react'
import ComponentsDemo from './components-demo'

describe('ComponentsDemo Page', () => {
  it('renders the components demo page with correct title', () => {
    render(<ComponentsDemo />)
    expect(screen.getByRole('heading', { name: /component documentation/i })).toBeInTheDocument()
  })

  it('renders component showcase section', () => {
    render(<ComponentsDemo />)
    expect(screen.getByTestId('component-showcase')).toBeInTheDocument()
  })

  it('renders component documentation section', () => {
    render(<ComponentsDemo />)
    expect(screen.getByTestId('component-documentation')).toBeInTheDocument()
  })

  it('renders theme toggle for dark/light mode preview', () => {
    render(<ComponentsDemo />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })
}) 