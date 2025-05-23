import React from 'react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, width, height, className }: { src: string; alt: string; width: number; height: number; className?: string }) => (
        <img src={typeof src === 'string' ? src : ''} alt={alt} width={width} height={height} className={className} />
    ),
}));

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    },
}));

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            back: jest.fn(),
        };
    },
    usePathname() {
        return '';
    },
    useSearchParams() {
        return new URLSearchParams();
    },
})); 