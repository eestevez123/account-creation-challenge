import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { jest, describe, test, expect } from '@jest/globals';
import { Input } from './input';

describe('Input Component', () => {
  test('renders label and input field', () => {
    render(<Input label="Username" />);
    
    const label = screen.getByText('Username');
    expect(label).toBeTruthy();

    const input = screen.getByRole('textbox');
    expect(input).toBeTruthy();
  });

  test('renders placeholder correctly', () => {
    render(<Input label="Email" placeholder="Enter your email" />);
    
    const input = screen.getByPlaceholderText('Enter your email');
    expect(input).toBeTruthy();
  });

  test('updates value when typed into the input field', () => {
    const handleChange = jest.fn();
    render(<Input label="Username" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(handleChange).toHaveBeenCalledWith('testuser');
  });

  test('renders password toggle icon when showPasswordToggle is true', () => {
    render(<Input label="Password" type="password" showPasswordToggle />);
    
    const button = screen.getByRole('button', { name: /show password/i });
    expect(button).toBeTruthy();
  });

  test('toggles password visibility when clicking the toggle button', () => {
    render(<Input label="Password" type="password" showPasswordToggle />);

    const input = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button', { name: /show password/i });

    // Default type should be "password"
    expect(input.getAttribute('type')).toEqual('password');

    // Click to toggle visibility
    fireEvent.click(toggleButton);
    expect(input.getAttribute('type')).toEqual('text');
    expect(toggleButton.getAttribute('aria-label')).toEqual('Hide password');

    // Click again to hide the password
    fireEvent.click(toggleButton);
    expect(input.getAttribute('type')).toEqual('password');
    expect(toggleButton.getAttribute('aria-label')).toEqual('Show password');
  });

  test('does not render password toggle if showPasswordToggle is false', () => {
    render(<Input label="Password" type="password" />);
    
    const toggleButton = screen.queryByRole('button', { name: /show password/i });
    expect(toggleButton).not.toBeTruthy();
  });

  test('assigns correct id to input and associates it with the label', () => {
    render(<Input label="Full Name" />);
    
    const input = screen.getByRole('textbox');
    const label = screen.getByText('Full Name');

    expect(input.getAttribute('id')).toEqual('full_name');
    expect(label.getAttribute('for')).toEqual('full_name');
  });
});
