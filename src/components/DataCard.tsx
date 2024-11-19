import React from 'react';
import Card from './Card';
import { LucideIcon } from 'lucide-react';

interface DataCardProps {
  title: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
  children: React.ReactNode;
  className?: string;
  isDarkMode?: boolean;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  icon: Icon,
  action,
  children,
  className = '',
  isDarkMode = false
}) => {
  return (
    <Card 
      className={`${className}`}
      isDarkMode={isDarkMode}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-blue-500/10 text-blue-400' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
            )}
            <h3 className={`text-lg font-semibold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              {title}
            </h3>
          </div>
          {action && (
            <button 
              onClick={action.onClick}
              className={`text-sm ${
                isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              {action.label}
            </button>
          )}
        </div>
        {children}
      </div>
    </Card>
  );
};

export default DataCard;