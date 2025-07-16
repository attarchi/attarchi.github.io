import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

export async function flushTypewriterUntilText(heading: HTMLElement, expected: string) {
  // Simple wait for text to appear without fake timers
  for (let i = 0; i < 50; i++) {
    if (heading.textContent === expected) return;
    // Wait a bit for React to update
    await new Promise(resolve => setTimeout(resolve, 10));
  }
} 