import React, { useState } from 'react';
import { 
  Hotel, 
  CreditCard, 
  MessageSquare, 
  Database,
  Mail,
  Calendar,
  Check,
  AlertCircle,
  Loader
} from 'lucide-react';
import { testOpenAIConnection } from '../../services/test-openai';

interface APIConfigurationsProps {
  isDarkMode: boolean;
}

interface APIConfig {
  id: string;
  name: string;
  icon: any;
  description: string;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'password' | 'select';
    options?: Array<{ value: string; label: string; }>;
    required?: boolean;
    placeholder?: string;
  }>;
  status: 'connected' | 'disconnected' | 'error';
  docsUrl: string;
}

const APIs: APIConfig[] = [
  {
    id: 'thais',
    name: 'THAIS PMS',
    icon: Hotel,
    description: 'Système de gestion hôtelière',
    fields: [
      {
        name: 'apiKey',
        label: 'Clé API',
        type: 'password',
        required: true,
        placeholder: 'thais_api_xxxxx'
      },
      {
        name: 'environment',
        label: 'Environnement',
        type: 'select',
        options: [
          { value: 'production', label: 'Production' },
          { value: 'sandbox', label: 'Sandbox' }
        ]
      }
    ],
    status: 'disconnected',
    docsUrl: 'https://docs.thais.fr'
  },
  {
    id: 'pennylane',
    name: 'Pennylane',
    icon: CreditCard,
    description: 'Gestion comptable et facturation',
    fields: [
      {
        name: 'clientId',
        label: 'Client ID',
        type: 'text',
        required: true
      },
      {
        name: 'clientSecret',
        label: 'Client Secret',
        type: 'password',
        required: true
      }
    ],
    status: 'disconnected',
    docsUrl: 'https://api.pennylane.tech/docs'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: MessageSquare,
    description: 'Assistant IA',
    fields: [
      {
        name: 'apiKey',
        label: 'Clé API OpenAI',
        type: 'password',
        required: true,
        placeholder: 'sk-xxxxx'
      },
      {
        name: 'model',
        label: 'Modèle',
        type: 'select',
        options: [
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
        ]
      }
    ],
    status: 'disconnected',
    docsUrl: 'https://platform.openai.com/docs'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    icon: Mail,
    description: 'Synchronisation des emails',
    fields: [
      {
        name: 'clientId',
        label: 'Client ID Google',
        type: 'text',
        required: true
      },
      {
        name: 'clientSecret',
        label: 'Client Secret',
        type: 'password',
        required: true
      }
    ],
    status: 'disconnected',
    docsUrl: 'https://developers.google.com/gmail/api'
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    icon: Calendar,
    description: 'Synchronisation du calendrier',
    fields: [
      {
        name: 'clientId',
        label: 'Client ID Google',
        type: 'text',
        required: true
      },
      {
        name: 'clientSecret',
        label: 'Client Secret',
        type: 'password',
        required: true
      }
    ],
    status: 'disconnected',
    docsUrl: 'https://developers.google.com/calendar'
  }
];

const APIConfigurations: React.FC<APIConfigurationsProps> = ({ isDarkMode }) => {
  const [selectedAPI, setSelectedAPI] = useState<APIConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTest = async () => {
    if (!selectedAPI) return;

    setTestStatus('testing');

    try {
      // Exemple avec OpenAI, à adapter pour chaque API
      if (selectedAPI.id === 'chatgpt') {
        const result = await testOpenAIConnection(formData.apiKey);
        setTestStatus(result.success ? 'success' : 'error');
      } else {
        // Implémenter les tests pour les autres APIs
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTestStatus('success');
      }
    } catch (error) {
      setTestStatus('error');
    }
  };

  const handleSave = async () => {
    if (!selectedAPI) return;

    // Sauvegarder la configuration dans le localStorage ou l'API
    localStorage.setItem(`${selectedAPI.id}_config`, JSON.stringify(formData));
    
    // Réinitialiser le formulaire
    setFormData({});
    setSelectedAPI(null);
    setTestStatus('idle');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-6">Configuration des APIs</h2>

      {/* Liste des APIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {APIs.map(api => (
          <button
            key={api.id}
            onClick={() => setSelectedAPI(api)}
            className={`p-4 rounded-lg text-left transition-colors ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-700' 
                : 'bg-white hover:bg-gray-50'
            } border ${
              selectedAPI?.id === api.id
                ? isDarkMode
                  ? 'border-blue-500'
                  : 'border-indigo-500'
                : isDarkMode
                ? 'border-slate-700'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
              }`}>
                <api.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium">{api.name}</h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {api.description}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 text-xs rounded-full ${
                api.status === 'connected'
                  ? isDarkMode
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-green-100 text-green-600'
                  : api.status === 'error'
                  ? isDarkMode
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-red-100 text-red-600'
                  : isDarkMode
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {api.status === 'connected' ? 'Connecté' : 
                 api.status === 'error' ? 'Erreur' : 'Non connecté'}
              </span>
              <a
                href={api.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm ${
                  isDarkMode ? 'text-blue-400' : 'text-indigo-600'
                } hover:underline`}
                onClick={e => e.stopPropagation()}
              >
                Documentation
              </a>
            </div>
          </button>
        ))}
      </div>

      {/* Modal de configuration */}
      {selectedAPI && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className={`w-full max-w-lg mx-4 p-6 rounded-xl ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
              }`}>
                <selectedAPI.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">
                Configuration {selectedAPI.name}
              </h3>
            </div>

            <div className="space-y-4">
              {selectedAPI.fields.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg ${
                        isDarkMode
                          ? 'bg-slate-700 text-gray-100'
                          : 'bg-gray-50 text-gray-900'
                      } border-0 focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Sélectionnez une option</option>
                      {field.options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full px-4 py-2 rounded-lg ${
                        isDarkMode
                          ? 'bg-slate-700 text-gray-100'
                          : 'bg-gray-50 text-gray-900'
                      } border-0 focus:ring-2 focus:ring-blue-500`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setSelectedAPI(null);
                  setFormData({});
                  setTestStatus('idle');
                }}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-slate-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Annuler
              </button>
              <button
                onClick={handleTest}
                disabled={testStatus === 'testing'}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  testStatus === 'success'
                    ? isDarkMode
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-green-100 text-green-600'
                    : testStatus === 'error'
                    ? isDarkMode
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-red-100 text-red-600'
                    : isDarkMode
                    ? 'bg-slate-700 text-gray-300'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {testStatus === 'testing' ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : testStatus === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : testStatus === 'error' ? (
                  <AlertCircle className="w-4 h-4" />
                ) : null}
                Tester la connexion
              </button>
              <button
                onClick={handleSave}
                disabled={testStatus !== 'success'}
                className={`px-4 py-2 rounded-lg text-white ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APIConfigurations;