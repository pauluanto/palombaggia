import React from 'react';

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  isDarkMode: boolean;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  value,
  onChange,
  required = false,
  placeholder,
  rows = 3,
  isDarkMode
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
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

export default FormTextarea;