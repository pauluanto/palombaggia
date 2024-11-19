import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SettingsToggleProps {
  label: string;
  icon?: LucideIcon;
  checked: boolean;
  onChange: (checked: boolean) => void;
  isDarkMode: boolean;
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({
  label,
  icon: Icon,
  checked,
  onChange,
  isDarkMode
}) => {
  return (
    <label className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5" />}
        <span>{label}</span>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded text-secondary focus:ring-secondary"
      />
    </label>
  );
};

export default SettingsToggle;