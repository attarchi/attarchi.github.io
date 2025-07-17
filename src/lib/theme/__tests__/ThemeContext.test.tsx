import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useContext } from 'react'
import { ThemeProvider, ThemeContext } from '../ThemeContext'
import { ThemeContextType } from '../ThemeContext'

const mockMatchMedia = (matches: boolean) => ({
  matches,
  media: '(prefers-color-scheme: dark)',
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn()
})

const mockLocalStorage = (initialValue: string | null = null) => ({
  getItem: jest.fn().mockReturnValue(initialValue),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn()
})

const setupWindowMocks = (options: { matches?: boolean; localStorageValue?: string | null } = {}) => {
  const { matches = false, localStorageValue = null } = options
  window.matchMedia = jest.fn().mockImplementation(() => mockMatchMedia(matches))
  window.localStorage = mockLocalStorage(localStorageValue)
}

const cleanupWindowMocks = () => {
  delete (window as any).matchMedia
  delete (window as any).localStorage
}

const renderTestComponentWithThemeProvider = (options: { 
  withButton?: boolean;
  onButtonClick?: () => void;
} = {}) => {
  const { withButton = false, onButtonClick } = options

  function TestComponent() {
    const { theme, setTheme } = useContext(ThemeContext)
    return (
      <>
        <span data-testid="theme">{theme}</span>
        {withButton && (
          <button onClick={() => onButtonClick ? onButtonClick() : setTheme('dark')}>
            Set Dark
          </button>
        )}
      </>
    )
  }

  return render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    cleanupWindowMocks()
  })

  it('handles window without localStorage support', () => {
    setupWindowMocks()
    delete (window as any).matchMedia
    delete (window as any).localStorage
    renderTestComponentWithThemeProvider()
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it('handles window without matchMedia support', () => {
    setupWindowMocks()
    delete (window as any).matchMedia
    renderTestComponentWithThemeProvider()
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it('provides a default value', () => {
    setupWindowMocks()
    
    let context: ThemeContextType | undefined
    function TestComponent() {
      context = useContext(ThemeContext)
      return null
    }
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(context).toBeDefined()
    expect(context?.theme).toBeDefined()
    expect(typeof context?.setTheme).toBe('function')
  })

  it('allows consuming and updating the theme', async () => {
    setupWindowMocks()
    renderTestComponentWithThemeProvider({ withButton: true })
    expect(screen.getByTestId('theme').textContent).toBe('light')
    await userEvent.click(screen.getByText('Set Dark'))
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  it('persists theme in local storage', async () => {
    setupWindowMocks()
    renderTestComponentWithThemeProvider({ withButton: true })
    await userEvent.click(screen.getByText('Set Dark'))
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('uses default theme when no preference set', () => {
    setupWindowMocks({ matches: false })
    renderTestComponentWithThemeProvider()
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it('retrieves theme from local storage', () => {
    setupWindowMocks({ localStorageValue: 'dark' })
    renderTestComponentWithThemeProvider()
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  it('detects system preference', () => {
    setupWindowMocks({ matches: true })
    renderTestComponentWithThemeProvider()
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  it('uses system preference when localStorage is empty', () => {
    setupWindowMocks({ matches: true, localStorageValue: null })
    renderTestComponentWithThemeProvider()
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  it('updates theme when system preference changes', () => {
    setupWindowMocks()
    let listener: ((e: MediaQueryListEvent) => void) | undefined
    const mockMediaQueryList = {
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: (event: string, cb: (e: MediaQueryListEvent) => void) => {
        if (event === 'change') listener = cb
      },
      removeEventListener: jest.fn(),
      addListener: (cb: (e: MediaQueryListEvent) => void) => { listener = cb },
      removeListener: jest.fn(),
      dispatchEvent: jest.fn()
    }
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => mockMediaQueryList)
    })

    renderTestComponentWithThemeProvider()
    expect(screen.getByTestId('theme').textContent).toBe('dark')

    act(() => {
      listener?.({ matches: false } as MediaQueryListEvent)
    })
    expect(screen.getByTestId('theme').textContent).toBe('light')

    act(() => {
      listener?.({ matches: true } as MediaQueryListEvent)
    })
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })
})