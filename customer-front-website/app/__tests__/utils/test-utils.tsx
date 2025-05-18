import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Custom render function that includes common providers if needed
 * Extend this to add context providers, themes, etc.
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { ...options })
  };
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };