import React, { useState } from 'react';
import { Input } from '../../reusable-components/input/input';
import { Button } from '../../reusable-components/button/button';
import { Card } from '../../reusable-components/card/card';
import { PasswordStrengthIndicator } from 'app/frontend/reusable-components/password-strength-indicator/password-strength-indicator';

export function CreateAccount () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState<number>(0);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  // Regex to ensure at least 1 letter and 1 number
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateAccountInput();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        // All input is acceptable!
        console.log('Form Submitted', { username, password });
        alert('Account created successfully!');
    }
  };

  const validateAccountInput = () => {
    const newErrors: { username?: string; password?: string } = {};

    // Validate username
    if (!username.trim()) {
        newErrors.username = 'Username cannot be empty.';
    } else {
        // username exists
        // The username is >= 10 characters, and <= 50 characters
        const lengthError = checkLengthReq(username, 'Username', 10, 50);
        if (lengthError) {
            newErrors.username = lengthError;
        }
    }
  
    // Validate password
    if (!password.trim()) {
        newErrors.password = 'Password cannot be empty.';
    } else {
        // password exists
        // The password is >= 20 characters, and <= 50 characters
        const lengthError = checkLengthReq(password, 'Password', 20, 50);
        if (lengthError) {
            newErrors.password = lengthError;
        } else if (!passwordRegex.test(password)) {
            // Contains at least 1 letter (a-zA-Z) and 1 number (0-9)
            newErrors.password = 'Password must contain at least one letter and one number.';
        } else if (passwordScore < 2) {
            // The password has a Zxcvbn score >= 2.
            newErrors.password = 'Password is too weak. Please use a stronger password.';
        }
    }

      return newErrors;
  }

  /**
   * Check length requirements for the given field
   * @param input 
   * @param fieldName 
   * @param min 
   * @param max 
   * @returns 
   */
  const checkLengthReq = (input:string, fieldName:string, min:number | null , max:number | null) => {
    if (min && input.length < min) {
        return `${fieldName} should be greater than ${min} characters`;
    } else if (max && input.length > max) {
        return `${fieldName} should be less than ${max} characters`;
    }
    return '';
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4 p-8">
          <div className="text-center mb-4">
            <img
              src='/logo.png'
              alt="Wealthfront Logo"
              className="h-12 w-12 mx-auto"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
            Create New Account
            </h1>
          </div>

          {/* Username Field */}
            <Input
            label="Username"
            type="text"
            onChange={(val) => setUsername(val)}
            placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username}</p>
            )}
          {/* Password Field */}
          <Input
            label="Password"
            type="password"
            showPasswordToggle={true}
            onChange={(val) => setPassword(val)}
            placeholder="Enter your password"
          />
            {/* Password Strength Indicator */}
            <PasswordStrengthIndicator 
            password={password}
            onScoreChange={(score) => setPasswordScore(score)}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}

          {/* Submit Button */}
          <Button type="submit" classesOverride="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Create Account
          </Button>
        </form>
      </Card>
    </div>
  )
}
