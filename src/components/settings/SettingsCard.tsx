import React from 'react';

interface SettingsCardProps {
  title: string;
  children: React.ReactNode;
  isDarkMode: boolean;
  action?: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  children,
  isDarkMode,
  action
}) => {
  return (
    <div className={`rounded-xl p-6 ${
      isDarkMode ? 'bg-slate-800' : 'bg-white/90'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
};

export default SettingsCard;