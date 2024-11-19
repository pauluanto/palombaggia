import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
  isDarkMode: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  isDarkMode
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 rounded-lg ${
          isDarkMode
            ? 'bg-slate-700 text-gray-100'
            : 'bg-gray-50 text-gray-900'
        } border-0 focus:ring-2 focus:ring-secondary`}
        required={required}
      >
        <option value="">Sélectionnez une option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;