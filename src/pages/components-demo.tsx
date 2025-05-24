import { useState } from 'react'
import { useTheme } from 'next-themes'

const ComponentsDemo = () => {
  const { theme, setTheme } = useTheme()
  const [selectedComponent, setSelectedComponent] = useState<string>('')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Component Documentation</h1>
      
      <div className="flex justify-end mb-4">
        <button
          data-testid="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          Toggle Theme
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section data-testid="component-showcase" className="border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Component Showcase</h2>
          {/* Component showcase content will go here */}
        </section>

        <section data-testid="component-documentation" className="border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
          {/* Component documentation content will go here */}
        </section>
      </div>
    </div>
  )
}

export default ComponentsDemo 