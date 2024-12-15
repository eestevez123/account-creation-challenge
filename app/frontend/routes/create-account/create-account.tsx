import React, { useState } from 'react';
import { Input } from '../../reusable-components/input/input';
import { Button } from '../../reusable-components/button/button';
import { Card } from '../../reusable-components/card/card';

export function CreateAccount () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card title="Create New Account">
        <form onSubmit={handleSubmit} className="space-y-4 p-8">
          <div className="text-center mb-4">
            <img
              src='/logo.png'
              alt="Wealthfront Logo"
              className="h-12 w-12 mx-auto"
            />
            <h1 className="text-2xl font-bold text-indigo-800 mt-2">
              
            </h1>
          </div>

          {/* Username Field */}
          <Input
            label="Username"
            type="text"
            onChange={(v) => setUsername(v)}
            placeholder="Enter your username"
          />

          {/* Password Field */}
          <Input
            label="Password"
            type="password"
            onChange={(e) => setPassword(e)}
            placeholder="Enter your password"
          />

          {/* Submit Button */}
          <Button type="submit" classesOverride="w-full bg-indigo-600 text-white">
            Create Account
          </Button>
        </form>
      </Card>
    </div>
  )
}
