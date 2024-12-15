import React, { ChangeEvent, useState } from 'react';

interface Props {
  type: string;
  label: string;
  placeholder: string;
  onChange?: (value: string) => void;
}

const buttonClass = "w-full border-b border-gray-300 focus:outline-none focus:border-indigo-600 p-2";

export function Input({ onChange, label, type, placeholder }: Props) {
  const [value, setValue] = useState('');
  const id = label.toLowerCase().replace(/ /gm, '_');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange?.(event.target.value);
  }
  return (
    <div>
      <label className="block text-sm">{label}</label>
      <input
        id={id}
        type={type}
        className={buttonClass}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
