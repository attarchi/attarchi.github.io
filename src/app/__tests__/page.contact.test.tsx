import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Home from '../page'

// Mock the modules using the __mocks__ files
jest.mock('@/lib/blog-data')
jest.mock('@/components/micro')
jest.mock('@/components/sections')

describe('Home Page Contact Section', () => {
  it('renders the contact section', async () => {
    await act(async () => {
      render(await Home())
    })
    
    expect(screen.getByTestId('contact-section')).toBeInTheDocument()
  })

  it('renders contact form elements', async () => {
    await act(async () => {
      render(await Home())
    })
    
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
    expect(screen.getByTestId('contact-name-input')).toBeInTheDocument()
    expect(screen.getByTestId('contact-email-input')).toBeInTheDocument()
    expect(screen.getByTestId('contact-message-input')).toBeInTheDocument()
    expect(screen.getByTestId('contact-submit-button')).toBeInTheDocument()
  })

  it('renders contact section title and description', async () => {
    await act(async () => {
      render(await Home())
    })
    
    expect(screen.getByTestId('contact-title')).toBeInTheDocument()
    expect(screen.getByTestId('contact-description')).toBeInTheDocument()
  })

  it('contact form has proper input types', async () => {
    await act(async () => {
      render(await Home())
    })
    
    const nameInput = screen.getByTestId('contact-name-input')
    const emailInput = screen.getByTestId('contact-email-input')
    const messageInput = screen.getByTestId('contact-message-input')
    
    expect(nameInput).toHaveAttribute('type', 'text')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(messageInput).toHaveAttribute('placeholder', 'Message')
  })
}) 