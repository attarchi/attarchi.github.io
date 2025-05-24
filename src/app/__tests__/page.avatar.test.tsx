import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home Page Avatar Requirements', () => {
  it('renders the avatar image in hero section', () => {
    render(<Home />)
    
    const avatar = screen.getByRole('img', { name: /profile picture/i })
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src')
    expect(avatar).toHaveClass('rounded-full')
  })

  it('has proper avatar styling with border and size', () => {
    render(<Home />)
    
    const avatar = screen.getByRole('img', { name: /profile picture/i })
    const avatarContainer = avatar.parentElement
    
    expect(avatar).toHaveClass('border-4', 'border-accent', 'object-cover')
    expect(avatarContainer).toHaveClass('w-32', 'h-32', 'relative')
  })
}) 