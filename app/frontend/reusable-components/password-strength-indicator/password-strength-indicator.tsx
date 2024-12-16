import React, { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';

interface PasswordStrengthIndicatorProps {
  password: string;
  onScoreChange?: (score: number) => void; // Optional callback to pass password score
}

/**
 * Component that shows password strength score in a user friendly manner.
 * Shows the user useful hints, which reduces the frustration of having to create a secure password
 * 
 */
export function PasswordStrengthIndicator({ password, onScoreChange }: PasswordStrengthIndicatorProps) {
  const [debouncedPassword, setDebouncedPassword] = useState(password);
  const [passwordScore, setPasswordScore] = useState<number>(0);
  const [strengthFeedback, setStrengthFeedback] = useState<string>('');

  // Debounce the password input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPassword(password); // Update the debounced password
    }, 500); // Debounce delay (500ms)

    return () => clearTimeout(timer); // Cleanup the timer on each render
  }, [password]);

  useEffect(() => {
    if (debouncedPassword) {
      const result = zxcvbn(debouncedPassword); // Evaluate password strength

      setPasswordScore(result.score);
      setStrengthFeedback(
        result.feedback.suggestions.join(' ') || 'Good password'
      );

      // Notify parent about the updated score
      onScoreChange?.(result.score);
    } else {
        setPasswordScore(0);
        setStrengthFeedback('');

        // Reset score to 0 when the input is cleared
        onScoreChange?.(0);
    }
  }, [debouncedPassword, onScoreChange]);

  if (!password) return null; // Don't render anything if no password is entered

  return (
    <div className="text-sm mt-2">
      {/* Password Strength */}
      <p>
        Password Strength:{' '}
        <span className={`font-semibold ${getStrengthColor(passwordScore)}`}>
          {getStrengthLabel(passwordScore)}
        </span>
      </p>
      {/* Feedback Suggestions */}
      {strengthFeedback && (
        <p className="text-xs text-gray-500">
          {strengthFeedback}
        </p>
      )}
    </div>
  );
}

/**
 * Helper to get strength label
 * 
 * @param score number between 0-4
 * @returns 
 */
function getStrengthLabel(score: number): string {
  switch (score) {
    case 0:
      return 'Very Weak';
    case 1:
      return 'Weak';
    case 2:
      return 'Fair';
    case 3:
      return 'Strong';
    case 4:
      return 'Very Strong';
    default:
      return '';
  }
}

/**
 * Helper to get text color based on strength
 * 
 * @param score number between 0-4
 * @returns 
 */
function getStrengthColor(score: number): string {
  switch (score) {
    case 0:
      return 'text-red-500';
    case 1:
      return 'text-orange-500';
    case 2:
      return 'text-yellow-500';
    case 3:
      return 'text-green-500';
    case 4:
      return 'text-blue-500';
    default:
      return 'text-gray-500';
  }
}
