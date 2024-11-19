import React from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  value: string | number;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  isDarkMode: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
  isDarkMode
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg ${
          isDarkMode
            ? 'bg-slate-700 text-gray-100'
            : 'bg-gray-50 text-gray-900'
        } border-0 focus:ring-2 focus:ring-secondary`}
        required={required}
      />
    </div>
  );
};

export default FormInput;