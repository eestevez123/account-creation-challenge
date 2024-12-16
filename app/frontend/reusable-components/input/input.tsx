import React, { ChangeEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface Props {
  type: string;
  label: string;
  placeholder: string;
  showPasswordToggle?: boolean;
  onChange?: (value: string) => void;
}

const buttonClass = "w-full border-b border-gray-300 focus:outline-none focus:border-indigo-600 p-2";

export function Input({ onChange, label, type, placeholder, showPasswordToggle=false }: Props) {
  const [value, setValue] = useState('');
  const id = label.toLowerCase().replace(/ /gm, '_');

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange?.(event.target.value);
  }
  
  return (
    <div className="relative">
      {/* Label */}
      <label htmlFor={id} className="block text-sm text-gray-700 mb-1">
        {label}
      </label>

      {/* Input */}
      <input
        id={id}
        type={showPasswordToggle && type === 'password' && showPassword ? 'text' : type} // Toggle type
        className={buttonClass}
        value={value}
        placeholder={placeholder}
        aria-describedby={showPasswordToggle && type === 'password' ? `${id}-toggle` : undefined}
        onChange={handleChange}
      />

      {/* Password Toggle Icon */}
      {showPasswordToggle && type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'} // Accessible label
          aria-pressed={showPassword} // Indicate the toggle state
          id={`${id}-toggle`}
          className="absolute right-3 top-2/4 transform -translate-y-2/4 cursor-pointer text-gray-500 hover:text-gray-700 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded"
          tabIndex={0} // Ensure button is focusable
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      )}
    </div>
  );
}
