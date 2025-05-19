jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));
