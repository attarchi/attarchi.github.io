import React from 'react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        const { src, alt, width, height, className } = props;
        return <img src={typeof src === 'string' ? src : ''} alt={alt} width={width} height={height} className={className} />;
    },
}));

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href, className, ...props }: { children: React.ReactNode; href: string; className?: string; [key: string]: any }) => {
        return <a href={href} className={className} {...props}>{children}</a>;
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