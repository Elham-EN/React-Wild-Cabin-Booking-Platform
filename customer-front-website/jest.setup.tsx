// This file is run before each test file
import React from 'react';
import '@testing-library/jest-dom';

// Mock next/navigation since it's used by components but not available in test environment
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => ({ get: jest.fn() })),
  useParams: jest.fn(() => ({})),
}));

// Mock HeroIcons (if needed)
jest.mock('@heroicons/react/24/solid', () => ({
  HomeIcon: () => <svg data-testid="home-icon" />,
  UserIcon: () => <svg data-testid="user-icon" />,
  CalendarDaysIcon: () => <svg data-testid="calendar-icon" />,
  ArrowRightEndOnRectangleIcon: () => <svg data-testid="signout-icon" />,
}));

// Suppress console errors/warnings during tests
// You can comment these out if you want to see all console output
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => {});
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});