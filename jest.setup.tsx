import React from 'react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />;
    },
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