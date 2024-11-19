import React from 'react';
import { Sun, Moon, Check } from 'lucide-react';

interface ThemeSelectorProps {
  isDarkMode: boolean;
  onChange: (isDark: boolean) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  isDarkMode,
  onChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => onChange(false)}
        className={`p-4 rounded-lg border-2 ${
          !isDarkMode
            ? 'border-secondary'
            : isDarkMode
              ? 'border-gray-700'
              : 'border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <Sun className="w-5 h-5" />
          {!isDarkMode && <Check className="w-5 h-5 text-secondary" />}
        </div>
        <span className="font-medium">Mode clair</span>
      </button>
      <button
        onClick={() => onChange(true)}
        className={`p-4 rounded-lg border-2 ${
          isDarkMode
            ? 'border-blue-600'
            : isDarkMode
              ? 'border-gray-700'
              : 'border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <Moon className="w-5 h-5" />
          {isDarkMode && <Check className="w-5 h-5 text-blue-600" />}
        </div>
        <span className="font-medium">Mode sombre</span>
      </button>
    </div>
  );
};

export default ThemeSelector;