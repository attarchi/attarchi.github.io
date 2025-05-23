import { render } from '@testing-library/react'
import RootLayout from '../layout'

describe('RootLayout', () => {
  it('renders children with correct font classes', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
      { container: document.documentElement }
    )

    const body = container.querySelector('body')
    expect(body).toHaveClass('antialiased')
    expect(body?.className).toContain('variable')
  })

  it('renders with correct HTML lang attribute', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
      { container: document.documentElement }
    )

    const html = container.querySelector('html')
    expect(html).toHaveAttribute('lang', 'en')
  })

  it('renders children content', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
      { container: document.documentElement }
    )

    expect(getByText('Test Child')).toBeInTheDocument()
  })
}) 