import React from 'react'

interface SyntaxHighlighterProps {
  language: string
  style: any
  children: React.ReactNode
}

export const Prism = ({ children, language, style }: SyntaxHighlighterProps) => (
  <pre className={`language-${language}`}>{children}</pre>
)

export const vscDarkPlus = {} 