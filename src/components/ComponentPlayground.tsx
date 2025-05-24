import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dynamic from 'next/dynamic'

interface ComponentProp {
  type: string
  default: any
}

interface ComponentDefinition {
  name: string
  variants: string[]
  props: Record<string, ComponentProp>
}

interface ComponentPlaygroundProps {
  component: ComponentDefinition
}

const ComponentPlayground = ({ component }: ComponentPlaygroundProps) => {
  const [selectedVariant, setSelectedVariant] = useState(component.variants[0])
  const [props, setProps] = useState<Record<string, any>>(
    Object.entries(component.props).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value.default
    }), {})
  )

  const handlePropChange = (propName: string, value: any) => {
    setProps(prev => ({ ...prev, [propName]: value }))
  }

  const generateCodeExample = () => {
    const propsString = Object.entries(props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')
    return `<${component.name} variant="${selectedVariant}" ${propsString} />`
  }

  const DynamicComponent = dynamic(() => import(`@/components/ui/${component.name}`), {
    loading: () => <div>Loading component...</div>,
    ssr: false
  })

  return (
    <div className="space-y-4">
      <div data-testid="component-preview" className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Preview</h3>
        <DynamicComponent {...props} variant={selectedVariant} />
      </div>

      <div className="space-y-2">
        <label className="block">
          Variant:
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="ml-2 p-1 border rounded"
          >
            {component.variants.map(variant => (
              <option key={variant} value={variant}>{variant}</option>
            ))}
          </select>
        </label>

        {Object.entries(component.props).map(([propName, propDef]) => (
          <label key={propName} className="block">
            {propName}:
            {propDef.type === 'boolean' ? (
              <input
                type="checkbox"
                checked={props[propName]}
                onChange={(e) => handlePropChange(propName, e.target.checked)}
                className="ml-2"
              />
            ) : (
              <input
                type="text"
                value={props[propName]}
                onChange={(e) => handlePropChange(propName, e.target.value)}
                className="ml-2 p-1 border rounded"
              />
            )}
          </label>
        ))}
      </div>

      <div data-testid="code-example" className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Code Example</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
          {generateCodeExample()}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default ComponentPlayground 