import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IntegrationCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  status: 'connected' | 'disconnected';
  onConfigure: () => void;
  isDarkMode: boolean;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  description,
  icon: Icon,
  status,
  onConfigure,
  isDarkMode
}) => {
  return (
    <div className={`p-4 rounded-lg ${
      isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-slate-600' : 'bg-white'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-2 py-1 rounded-full text-xs ${
            status === 'connected'
              ? isDarkMode
                ? 'bg-green-500/20 text-green-400'
                : 'bg-green-100 text-green-600'
              : isDarkMode
                ? 'bg-gray-600 text-gray-300'
                : 'bg-gray-100 text-gray-600'
          }`}>
            {status === 'connected' ? 'Connecté' : 'Non connecté'}
          </span>
          <button 
            onClick={onConfigure}
            className={`text-sm ${
              isDarkMode ? 'text-blue-400' : 'text-secondary'
            }`}
          >
            Configurer
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationCard;