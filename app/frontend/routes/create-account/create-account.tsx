import React, { useState } from 'react';
import { Input } from '../../reusable-components/input/input';
import { Button } from '../../reusable-components/button/button';
import { Card } from '../../reusable-components/card/card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PasswordStrengthIndicator } from '../../reusable-components/password-strength-indicator/password-strength-indicator';
import { validateAccountInput} from '../../utils/validation';
import AccountService from '../../api/AccountService';

/**
 * Create Account component
 */
export function CreateAccount () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState<number>(0);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [globalError, setGlobalError] = useState<string>('');
  const navigate = useNavigate(); 

  /**
   * Handle Account Creation Form submission
   * 
   * @param e Form Event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setGlobalError('');
    const newErrors = validateAccountInput(username, password, passwordScore); // Use front-end validation before we create the API call to create the account
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // All input is acceptable!
      try {
        const response = await AccountService.createAccount(username, password);

        // Account Created! - Axios throws an error if the req status is not 2XX
        console.log(response.data);
        // Redirect to /signup/account-selection
        navigate('/signup/account-selection');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const responseErrors:{usernameErrors?: string[], passwordErrors?: string[]} = error.response.data.errors;

          console.log("An API error occurred while attempting to create the account.");
          const newAPIErrors: { username?: string; password?: string } = {};

          if (responseErrors?.usernameErrors) {
            newAPIErrors.username = responseErrors.usernameErrors.join(' ');
          }
          if (responseErrors?.passwordErrors) {
            newAPIErrors.password = responseErrors.passwordErrors.join(' ');
          }
          setErrors(newAPIErrors);
        } else {
          // an error occurred while attempting to make the POST request!
          console.log("An expected error occurred while attempting to create the account.");
          setGlobalError('An expected error occurred while attempting to create the account. Please try again later.');
        }
      }
    }
  };

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

          {globalError && (
          <div className="text-center mb-4">
            <h3 className="text-red-500 mt-1">{globalError}</h3>
          </div>
          )}

          
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
