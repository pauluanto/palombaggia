import React from 'react';

interface SettingsInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  isDarkMode: boolean;
  placeholder?: string;
}

const SettingsInput: React.FC<SettingsInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  isDarkMode,
  placeholder
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
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
        } border-0 focus:ring-2 focus:ring-blue-500`}
      />
    </div>
  );
};

export default SettingsInput;