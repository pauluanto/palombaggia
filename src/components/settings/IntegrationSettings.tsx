import React from 'react';
import { Database, CreditCard, MessageSquare, Hotel, Plus } from 'lucide-react';

interface IntegrationSettingsProps {
  isDarkMode: boolean;
}

const integrations = [
  {
    id: 'thais',
    name: 'THAIS PMS',
    description: 'Gestion des réservations',
    status: 'connected',
    icon: Hotel
  },
  {
    id: 'pennylane',
    name: 'Pennylane',
    description: 'Comptabilité',
    status: 'connected',
    icon: CreditCard
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Assistant IA',
    status: 'disconnected',
    icon: MessageSquare
  }
];

const IntegrationSettings: React.FC<IntegrationSettingsProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Intégrations</h3>
        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
          isDarkMode 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-secondary hover:bg-secondary-light'
        }`}>
          <Plus className="w-5 h-5" />
          <span>Ajouter une intégration</span>
        </button>
      </div>

      <div className="space-y-4">
        {integrations.map(integration => (
          <div
            key={integration.id}
            className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-slate-600' : 'bg-white'
                }`}>
                  <integration.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">{integration.name}</h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {integration.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  integration.status === 'connected'
                    ? isDarkMode
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-green-100 text-green-600'
                    : isDarkMode
                      ? 'bg-gray-600 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                }`}>
                  {integration.status === 'connected' ? 'Connecté' : 'Non connecté'}
                </span>
                <button className={`text-sm ${
                  isDarkMode ? 'text-blue-400' : 'text-secondary'
                }`}>
                  Configurer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationSettings;