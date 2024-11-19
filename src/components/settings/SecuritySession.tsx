import React from 'react';

interface SecuritySessionProps {
  device: string;
  lastActivity: string;
  onDisconnect: () => void;
  isDarkMode: boolean;
}

const SecuritySession: React.FC<SecuritySessionProps> = ({
  device,
  lastActivity,
  onDisconnect,
  isDarkMode
}) => {
  return (
    <div className={`p-4 rounded-lg ${
      isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{device}</p>
          <p className="text-sm text-gray-500">Dernière activité: {lastActivity}</p>
        </div>
        <button 
          onClick={onDisconnect}
          className="text-red-500 hover:text-red-600"
        >
          Déconnecter
        </button>
      </div>
    </div>
  );
};

export default SecuritySession;