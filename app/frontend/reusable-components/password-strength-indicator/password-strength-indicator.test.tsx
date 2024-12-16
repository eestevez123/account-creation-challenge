import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { jest, describe, test, expect, beforeEach, afterEach} from '@jest/globals';
import { PasswordStrengthIndicator } from './password-strength-indicator';
import zxcvbn from 'zxcvbn';

// Mock zxcvbn library
jest.mock('zxcvbn', () => jest.fn());

describe('PasswordStrengthIndicator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers(); // Reset timers after each test
  });

  test('does not render anything when password is empty', () => {
    render(<PasswordStrengthIndicator password="" />);
    expect(screen.queryByText(/Password Strength/i)).not.toBeTruthy();
  });

  test('renders password strength and feedback for a valid password', async () => {
    // Mock zxcvbn result
    (zxcvbn as jest.Mock).mockReturnValue({
      score: 3,
      feedback: { suggestions: ['Use a mix of letters and numbers'] },
    });

    render(<PasswordStrengthIndicator password="StrongPass123!" />);

    // Simulate debounce time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Wait for debounce (500ms)
    await waitFor(() => {
      expect(screen.getByText(/Password Strength/i)).toBeTruthy();
      expect(screen.getByText(/Strong/i)).toBeTruthy();
      expect(screen.getByText(/Use a mix of letters and numbers/i)).toBeTruthy();
    });
  });

  test('renders "Very Weak" when zxcvbn score is 0', async () => {
    // Mock zxcvbn result
    (zxcvbn as jest.Mock).mockReturnValue({
      score: 0,
      feedback: { suggestions: ['Add more characters'] },
    });

    render(<PasswordStrengthIndicator password="weak" />);

    // Simulate debounce time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Wait for debounce
    await waitFor(() => {
      expect(screen.getByText(/Password Strength/i)).toBeTruthy();
      expect(screen.getByText(/Very Weak/i)).toBeTruthy();
      expect(screen.getByText(/Add more characters/i)).toBeTruthy();
    });
  });

  test('calls onScoreChange with correct score', async () => {
    const onScoreChange = jest.fn();

    // Mock zxcvbn result
    (zxcvbn as jest.Mock).mockReturnValue({
      score: 2,
      feedback: { suggestions: [] },
    });

    render(<PasswordStrengthIndicator password="FairPassword" onScoreChange={onScoreChange} />);

    // Simulate debounce time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Wait for debounce
    await waitFor(() => {
      expect(onScoreChange).toHaveBeenCalledWith(2);
    });
  });
});
