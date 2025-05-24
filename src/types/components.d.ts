import { ReactNode } from 'react'

export interface BaseComponentProps {
    variant?: string
    className?: string
    children?: ReactNode
}

export interface ButtonProps extends BaseComponentProps {
    label: string
    disabled?: boolean
    onClick?: () => void
}

export interface CardProps extends BaseComponentProps {
    title?: string
    content?: string
}

export interface BadgeProps extends BaseComponentProps {
    text: string
    color?: string
}

export interface TypographyProps extends BaseComponentProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
    text: string
} 