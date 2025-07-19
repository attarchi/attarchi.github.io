import { render } from '@testing-library/react'
import RootLayout, { metadata } from '../layout'

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



  describe('SEO Metadata', () => {
    it('has correct title', () => {
      expect(metadata.title).toBe('Attarchi - Senior Full-Stack Developer | React, Node.js, Mobile')
    })

    it('has correct description', () => {
      expect(metadata.description).toBe('Professional portfolio of Attarchi, a Senior Full-Stack Developer specializing in React, Node.js, TypeScript, and mobile app development. Based in Turkey with expertise in modern web technologies and offline-first architectures.')
    })

    it('has correct keywords', () => {
      expect(metadata.keywords).toBe('Full-Stack Developer, React, Node.js, TypeScript, Mobile Apps, Turkey, JavaScript, Frontend, Backend, Web Development, Software Engineer')
    })

    it('has Open Graph metadata', () => {
      expect(metadata.openGraph).toBeDefined()
      expect(metadata.openGraph?.title).toBe('Attarchi - Senior Full-Stack Developer | React, Node.js, Mobile')
      expect(metadata.openGraph?.description).toContain('Senior Full-Stack Developer')
      expect(metadata.openGraph?.url).toBe('https://attarchi.github.io')
      expect(metadata.openGraph?.siteName).toBe('Attarchi Portfolio')
    })

    it('has Twitter Card metadata', () => {
      expect(metadata.twitter).toBeDefined()
      expect(metadata.twitter?.title).toBe('Attarchi - Senior Full-Stack Developer | React, Node.js, Mobile')
      expect(metadata.twitter?.description).toContain('Senior Full-Stack Developer')
    })

    it('has canonical URL configuration', () => {
      expect(metadata.alternates?.canonical).toBe('/')
    })

    it('has robots configuration', () => {
      expect(metadata.robots).toBeDefined()
      if (typeof metadata.robots === 'object' && metadata.robots !== null) {
        expect(metadata.robots.index).toBe(true)
        expect(metadata.robots.follow).toBe(true)
      }
    })
  })
}) 