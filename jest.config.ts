import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    dir: './',
});

const config: Config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^react-syntax-highlighter$': '<rootDir>/__mocks__/react-syntax-highlighter.tsx',
        '^react-syntax-highlighter/dist/esm/styles/prism$': '<rootDir>/__mocks__/react-syntax-highlighter.tsx',
    },
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
        '!src/**/*.test.{js,jsx,ts,tsx}',
        '!src/**/index.{js,jsx,ts,tsx}',
    ],
    /*coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },*/
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(react-syntax-highlighter)/)'
    ],
};

export default createJestConfig(config); 