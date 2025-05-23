import { render } from '@testing-library/react'
import RootLayout from '../layout'

describe('RootLayout', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation((...args) => {
      if (/Warning: validateDOMNesting/.test(args[0])) {
        return;
      }
      // Fallback for other errors
      console.error(...args);
    });
  });
  
  it('renders children content', () => {
    const { getByText } = render(
      <div>
      {/* Simulate the html/body structure */}
      <div id="__next">
         <RootLayout>
        <div>Test Child</div>
      </RootLayout>
      </div>
      </div>
    )
    expect(getByText('Test Child')).toBeInTheDocument()
  })

  it('applies font classes to the body', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    )
    // Find the element with the expected classes
    const body = container.querySelector('body') || (container.firstChild as Element)
    expect(body?.className).toMatch(/antialiased/)
    expect(body?.className).toMatch(/variable/)
  })
}) 