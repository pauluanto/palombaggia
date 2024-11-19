import React, { useState } from 'react';
import { 
  Check, 
  AlertCircle, 
  Database, 
  CreditCard, 
  MessageSquare,
  Hotel,
  ArrowRight,
  ExternalLink,
  Copy,
  RefreshCw
} from 'lucide-react';

const integrations = [
  {
    id: 'thais',
    name: 'THAIS PMS',
    icon: Hotel,
    description: 'Système de gestion hôtelière',
    status: 'pending',
    steps: [
      {
        title: 'Créer un compte THAIS',
        url: 'https://thais.fr/signup',
        done: false
      },
      {
        title: 'Générer une clé API',
        description: 'Dans Paramètres > API > Créer une clé',
        done: false
      },
      {
        title: 'Configurer l\'intégration',
        done: false
      }
    ]
  },
  {
    id: 'pennylane',
    name: 'Pennylane',
    icon: CreditCard,
    description: 'Gestion comptable et facturation',
    status: 'pending',
    steps: [
      {
        title: 'Accéder à Pennylane',
        url: 'https://app.pennylane.com',
        done: false
      },
      {
        title: 'Créer des identifiants API',
        description: 'Dans Paramètres > Intégrations > API',
        done: false
      },
      {
        title: 'Configurer l\'intégration',
        done: false
      }
    ]
  },
  {
    id: 'credit-agricole',
    name: 'Crédit Agricole',
    icon: Database,
    description: 'Synchronisation bancaire',
    status: 'pending',
    steps: [
      {
        title: 'Contacter votre conseiller',
        description: 'Demander l\'activation de l\'API professionnelle',
        done: false
      },
      {
        title: 'Obtenir les identifiants',
        description: 'Client ID et Secret fournis par la banque',
        done: false
      },
      {
        title: 'Configurer l\'intégration',
        done: false
      }
    ]
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: MessageSquare,
    description: 'Assistant IA',
    status: 'pending',
    steps: [
      {
        title: 'Créer un compte OpenAI',
        url: 'https://platform.openai.com',
        done: false
      },
      {
        title: 'Générer une clé API',
        description: 'Dans API > Create new secret key',
        done: false
      },
      {
        title: 'Configurer l\'intégration',
        done: false
      }
    ]
  }
];

const IntegrationPage = () => {
  const [activeIntegration, setActiveIntegration] = useState(integrations[0]);
  const [apiKey, setApiKey] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
  };

  const handleTestConnection = () => {
    setTestStatus('testing');
    setTimeout(() => {
      setTestStatus('success');
    }, 1500);
  };

  const handleSave = () => {
    // Simuler la sauvegarde
    setIsConfiguring(false);
    setTestStatus('idle');
  };

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6 mt-12 lg:mt-0">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-luxury-brown">Intégrations</h1>
          <p className="text-gray-600">Connectez vos outils en quelques étapes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Liste des intégrations */}
        <div className="lg:col-span-4">
          <div className="bg-white/90 rounded-xl p-4">
            <div className="space-y-4">
              {integrations.map((integration) => (
                <button
                  key={integration.id}
                  onClick={() => {
                    setActiveIntegration(integration);
                    setIsConfiguring(false);
                    setTestStatus('idle');
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                    activeIntegration.id === integration.id
                      ? 'border-secondary bg-secondary/5'
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    activeIntegration.id === integration.id
                      ? 'bg-secondary/10 text-secondary'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <integration.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className="text-sm text-gray-500">{integration.description}</p>
                  </div>
                  {integration.status === 'connected' ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="lg:col-span-8">
          <div className="bg-white/90 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <activeIntegration.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{activeIntegration.name}</h2>
                  <p className="text-gray-600">{activeIntegration.description}</p>
                </div>
              </div>
              {!isConfiguring && (
                <button
                  onClick={() => setIsConfiguring(true)}
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors"
                >
                  Configurer
                </button>
              )}
            </div>

            {isConfiguring ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clé API
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-secondary"
                        placeholder="Collez votre clé API ici"
                      />
                      {apiKey && (
                        <button
                          onClick={handleCopyKey}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <Copy className="w-4 h-4 text-gray-500" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={handleTestConnection}
                      disabled={!apiKey || testStatus === 'testing'}
                      className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                        testStatus === 'success'
                          ? 'bg-green-50 text-green-600 border-green-100'
                          : testStatus === 'error'
                          ? 'bg-red-50 text-red-600 border-red-100'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {testStatus === 'testing' ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : testStatus === 'success' ? (
                        <Check className="w-4 h-4" />
                      ) : testStatus === 'error' ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                      Tester
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setIsConfiguring(false);
                      setTestStatus('idle');
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!apiKey || testStatus !== 'success'}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {activeIntegration.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.done
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {step.done ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{step.title}</h3>
                      {step.description && (
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      )}
                      {step.url && (
                        <a
                          href={step.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-secondary hover:text-secondary-light mt-2"
                        >
                          Accéder
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationPage;