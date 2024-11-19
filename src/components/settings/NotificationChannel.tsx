import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NotificationChannelProps {
  icon: LucideIcon;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const NotificationChannel: React.FC<NotificationChannelProps> = ({
  icon: Icon,
  label,
  checked,
  onChange
}) => {
  return (
    <label className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
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

export default NotificationChannel;