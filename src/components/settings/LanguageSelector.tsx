import React from 'react';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  isDarkMode: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  isDarkMode
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-2 rounded-lg ${
        isDarkMode
          ? 'bg-slate-700 text-gray-100'
          : 'bg-gray-50 text-gray-900'
      } border-0 focus:ring-2 focus:ring-blue-500`}
    >
      <option value="fr">Français</option>
      <option value="en">English</option>
      <option value="it">Italiano</option>
    </select>
  );
};

export default LanguageSelector;