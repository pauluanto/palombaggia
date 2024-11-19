import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SettingsTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isDarkMode: boolean;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  isDarkMode
}) => {
  return (
    <div className={`rounded-xl p-4 ${
      isDarkMode ? 'bg-slate-800' : 'bg-white/90'
    }`}>
      <nav className="space-y-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === tab.id
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-secondary text-white'
                : isDarkMode
                  ? 'text-gray-300 hover:bg-slate-700'
                  : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SettingsTabs;