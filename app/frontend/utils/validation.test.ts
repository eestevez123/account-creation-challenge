import { validateAccountInput, checkLengthReq } from './validation';
import { describe, expect, test} from '@jest/globals';

// Test passwordRegex directly
describe('passwordRegex', () => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

  test('should return true for valid passwords', () => {
    expect(passwordRegex.test('Password123')).toBe(true);
    expect(passwordRegex.test('123Password')).toBe(true);
    expect(passwordRegex.test('Pass123word')).toBe(true);
  });

  test('should return false for invalid passwords', () => {
    expect(passwordRegex.test('password')).toBe(false); // No number
    expect(passwordRegex.test('123456')).toBe(false); // No letter
    expect(passwordRegex.test('')).toBe(false); // Empty string
  });
});

// Test checkLengthReq
describe('checkLengthReq', () => {
  test('should return error message if input is shorter than min', () => {
    expect(checkLengthReq('abc', 'Field', 5, null)).toBe('Field should be greater than 5 characters');
  });

  test('should return error message if input is longer than max', () => {
    expect(checkLengthReq('abcdef', 'Field', null, 5)).toBe('Field should be less than 5 characters');
  });

  test('should return an empty string for valid length', () => {
    expect(checkLengthReq('abcde', 'Field', 3, 5)).toBe('');
    expect(checkLengthReq('abc', 'Field', null, 5)).toBe('');
    expect(checkLengthReq('abcdef', 'Field', 3, null)).toBe('');
  });
});

// Test validateAccountInput
describe('validateAccountInput', () => {
  test('should return error for empty username', () => {
    const errors = validateAccountInput('', 'Password12345', 3);
    expect(errors.username).toBe('Username cannot be empty.');
  });

  test('should return error for username shorter than 10 characters', () => {
    const errors = validateAccountInput('short', 'Password12345', 3);
    expect(errors.username).toBe('Username should be greater than 10 characters');
  });

  test('should return error for username longer than 50 characters', () => {
    const longUsername = 'a'.repeat(51);
    const errors = validateAccountInput(longUsername, 'Password12345', 3);
    expect(errors.username).toBe('Username should be less than 50 characters');
  });

  test('should return error for empty password', () => {
    const errors = validateAccountInput('validUsername', '', 3);
    expect(errors.password).toBe('Password cannot be empty.');
  });

  test('should return error for password shorter than 20 characters', () => {
    const errors = validateAccountInput('validUsername', 'Short1', 3);
    expect(errors.password).toBe('Password should be greater than 20 characters');
  });

  test('should return error for password longer than 50 characters', () => {
    const longPassword = 'P@ssword123'.repeat(6); // Over 50 characters
    const errors = validateAccountInput('validUsername', longPassword, 3);
    expect(errors.password).toBe('Password should be less than 50 characters');
  });

  test('should return error if password does not meet regex requirements', () => {
    const errors = validateAccountInput('validUsername', 'PasswordWithoutNumbers', 3);
    expect(errors.password).toBe('Password must contain at least one letter and one number.');
  });

  test('should return error for weak password score', () => {
    const errors = validateAccountInput('validUsername', 'StrongPassword1231234567890', 1);
    expect(errors.password).toBe('Password is too weak. Please use a stronger password.');
  });

  test('should return no errors for valid input', () => {
    const errors = validateAccountInput('validUsername', 'StrongPassword1231234567890', 3);
    expect(errors).toEqual({});
  });
});
