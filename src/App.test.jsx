import React, { render, screen } from '@testing-library/react';
import { StatelessApp } from './App';

test('renders learn react link', () => {
  render(<StatelessApp />);
  const linkElement = screen.getByText(/use location/i);
  expect(linkElement).toBeInTheDocument();
});
