import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest, describe, test, expect, beforeEach} from '@jest/globals';
import { CreateAccount } from './create-account';
import AccountService from '../../api/AccountService';
import { validateAccountInput} from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

// Mock dependencies
jest.mock('../../api/AccountService');
jest.mock('../../utils/validation');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as object,
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
const mockCreateAccount = AccountService.createAccount as jest.MockedFunction<typeof AccountService.createAccount>;
const mockValidateAccountInput = validateAccountInput as jest.MockedFunction<typeof validateAccountInput>;


describe('CreateAccount Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockReset();
  });

  test('renders the form correctly', () => {
    render(<CreateAccount />);

    expect(screen.getByText(/Create New Account/i)).toBeTruthy();
    expect(screen.getByLabelText(/Username/i)).toBeTruthy();
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' });
    expect(passwordInput).toBeTruthy();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeTruthy();
  });

  test('shows validation errors on invalid input', () => {
    (validateAccountInput as jest.Mock).mockReturnValue({
      username: 'Username cannot be empty.',
      password: 'Password must be at least 8 characters.',
    });

    render(<CreateAccount />);

    const button = screen.getByRole('button', { name: /Create Account/i });
    fireEvent.click(button);

    expect(validateAccountInput).toHaveBeenCalled();
    expect(screen.getByText(/Username cannot be empty/i)).toBeTruthy();
    expect(screen.getByText(/Password must be at least 8 characters/i)).toBeTruthy();
  });

  test('handles successful account creation', async () => {
    // Mock validateAccountInput to return no errors
    (validateAccountInput as jest.Mock).mockReturnValue({});
  
    // Mock AccountService.createAccount to resolve successfully
    const mockAxiosResponse: AxiosResponse = {
      data: { message: 'Account created successfully' },
      status: 201,
      statusText: 'Created',
      headers: {},
      config: {
        headers: {} as AxiosRequestHeaders
      },
    };

    mockCreateAccount.mockResolvedValueOnce(mockAxiosResponse);
  
    render(<CreateAccount />);
  
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'validUsername1234567890' } });
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' });
    fireEvent.change(passwordInput, { target: { value: 'StrongPassword1231234567890123456789012345678901234567890' } });
  
    const button = screen.getByRole('button', { name: /Create Account/i });
    fireEvent.click(button);
  
    await waitFor(() => {
      expect(AccountService.createAccount).toHaveBeenCalledWith('validUsername1234567890', 'StrongPassword1231234567890123456789012345678901234567890');
      expect(mockNavigate).toHaveBeenCalledWith('/signup/account-selection');
    });
  });

  test('handles unexpected API errors', async () => {
    mockValidateAccountInput.mockReturnValue({});
    mockCreateAccount.mockRejectedValueOnce(new Error('Unexpected server error'));

    render(<CreateAccount />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'validUsername' } });
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' });
    fireEvent.change(passwordInput, { target: { value: 'StrongPassword123' } });

    const button = screen.getByRole('button', { name: /Create Account/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(AccountService.createAccount).toHaveBeenCalledWith('validUsername', 'StrongPassword123');
      expect(screen.getByText(/An expected error occurred while attempting to create the account/i)).toBeTruthy();
    });
  });
});
