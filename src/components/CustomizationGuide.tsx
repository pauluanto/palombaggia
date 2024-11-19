import React from 'react';
import { 
  Wrench, 
  ArrowRight, 
  Database, 
  CreditCard, 
  MessageSquare, 
  Hotel,
  AlertCircle
} from 'lucide-react';

const CustomizationGuide = () => {
  const integrations = [
    {
      title: 'THAIS PMS',
      description: 'Système de gestion hôtelière',
      steps: [
        'Connectez-vous à votre compte THAIS',
        'Allez dans Paramètres > API',
        'Copiez votre clé API',
        'Collez la clé dans les paramètres de Palombaggia 360°'
      ],
      url: 'https://thais.fr'
    },
    {
      title: 'Pennylane',
      description: 'Gestion comptable',
      steps: [
        'Accédez à votre espace Pennylane',
        'Paramètres > Intégrations',
        'Générez une nouvelle clé API',
        'Configurez la synchronisation dans Palombaggia 360°'
      ],
      url: 'https://pennylane.com'
    },
    {
      title: 'Crédit Agricole',
      description: 'Suivi bancaire',
      steps: [
        'Connectez-vous à votre espace pro CA',
        'Accédez à la section API/Open Banking',
        'Activez l\'accès API',
        'Suivez le guide de connexion'
      ],
      url: 'https://credit-agricole.fr/professionnel'
    },
    {
      title: 'ChatGPT',
      description: 'Assistant IA',
      steps: [
        'Créez un compte OpenAI',
        'Générez une clé API',
        'Ajoutez la clé dans les paramètres',
        'Activez l\'assistant IA'
      ],
      url: 'https://platform.openai.com'
    }
  ];

  const customizationOptions = [
    {
      title: 'Widgets du Dashboard',
      description: 'Personnalisez les éléments affichés',
      options: [
        'Glissez-déposez les widgets',
        'Masquez/affichez les éléments',
        'Modifiez la taille des widgets',
        'Changez l\'ordre d\'affichage'
      ]
    },
    {
      title: 'Notifications',
      description: 'Configurez vos alertes',
      options: [
        'Réservations',
        'Tâches urgentes',
        'Paiements',
        'Messages du personnel'
      ]
    }
  ];

  return (
    <div className="bg-white/90 rounded-xl p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-luxury-brown mb-4">Guide de démarrage rapide</h2>
        <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-4 rounded-lg mb-4">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">Suivez ce guide étape par étape pour configurer votre dashboard</p>
        </div>
      </div>

      {/* Intégrations */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-luxury-brown mb-4">1. Connectez vos outils</h3>
        <div className="space-y-6">
          {integrations.map((integration, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-secondary" />
                {integration.title}
              </h4>
              <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
              
              <div className="space-y-2 mb-4">
                {integration.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-sm">
                      {stepIndex + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>

              <a 
                href={integration.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-secondary hover:text-secondary-light"
              >
                Accéder à {integration.title}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Personnalisation */}
      <div>
        <h3 className="text-lg font-semibold text-luxury-brown mb-4">2. Personnalisez votre dashboard</h3>
        <div className="space-y-6">
          {customizationOptions.map((option, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-secondary" />
                {option.title}
              </h4>
              <p className="text-sm text-gray-600 mb-4">{option.description}</p>
              
              <div className="space-y-2">
                {option.options.map((opt, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-sm">{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Besoin d'aide ?</h4>
        <p className="text-sm text-gray-600">
          Notre équipe est disponible pour vous aider dans la configuration.
          Contactez le support technique :
        </p>
        <div className="mt-2">
          <a href="mailto:support@palombaggia360.com" className="text-sm text-secondary hover:text-secondary-light">
            support@palombaggia360.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomizationGuide;