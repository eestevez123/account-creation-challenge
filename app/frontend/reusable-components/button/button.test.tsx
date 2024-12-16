import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import { Button } from './button';
import { BrowserRouter } from 'react-router-dom';

// Utility to wrap components with BrowserRouter
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Button Component', () => {
  test('renders button with default classes and text', () => {
    render(<Button type="button">Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeTruthy();
    expect(button.className).toEqual('inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] text-white');
  });

  test('applies custom classes when provided', () => {
    render(<Button type="submit" classesOverride="custom-class">Submit</Button>);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button.className).toEqual('custom-class');
    expect(button.className).not.toEqual('inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] text-white');
  });

  test('renders Link component when href is provided', () => {
    renderWithRouter(<Button href="/test-link">Go to Link</Button>);
    const link = screen.getByRole('link', { name: /go to link/i });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toEqual('/test-link');
  });

  test('renders button when href is not provided', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeTruthy();
    expect(button.getAttribute('type')).toEqual('submit');
  });

  test('renders children correctly', () => {
    render(<Button>My Button Text</Button>);
    expect(screen.getByText('My Button Text')).toBeTruthy();
  });
});
