import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Root } from './root';
import { jest, describe, expect, test} from '@jest/globals';

jest.mock('../../reusable-components/flow-layout/flow-layout.tsx', () => ({
  FlowLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="flow-layout">{children}</div>
  ),
}));

describe('Root Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test('renders the FlowLayout component', () => {
    renderWithRouter(<Root />);
    expect(screen.getByTestId('flow-layout')).toBeTruthy();
  });

  test('renders the Get Started link with correct path', () => {
    renderWithRouter(<Root />);
    const getStartedLink = screen.getByRole('link', { name: /Get started/i });
    expect(getStartedLink).toBeTruthy();
    expect(getStartedLink.getAttribute('href')).toEqual('/signup/account-selection');
  });

  test('renders the Create Account link with correct path', () => {
    renderWithRouter(<Root />);
    const createAccountLink = screen.getByRole('link', { name: /Create Account/i });
    expect(createAccountLink).toBeTruthy();
    expect(createAccountLink.getAttribute('href')).toEqual('/create-account');
  });
});