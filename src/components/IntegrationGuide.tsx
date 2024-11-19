import React from 'react';
import { Wrench, ArrowRight, Settings } from 'lucide-react';

const IntegrationGuide = () => {
  const integrations = [
    {
      title: 'THAIS PMS',
      description: 'Connectez votre compte THAIS pour synchroniser les réservations',
      apiKey: 'Rendez-vous dans Paramètres > API > Créer une clé',
      docsUrl: 'https://docs.thais.fr'
    },
    {
      title: 'Pennylane',
      description: 'Intégrez votre comptabilité Pennylane',
      apiKey: 'Disponible dans Paramètres > Intégrations > API',
      docsUrl: 'https://pennylane.tech/api-docs'
    },
    {
      title: 'Crédit Agricole',
      description: 'Connectez votre compte bancaire',
      apiKey: 'Accessible via votre espace pro bancaire',
      docsUrl: 'https://www.credit-agricole.fr/professionnel/api'
    }
  ];

  return (
    <div className="p-4 bg-white/90 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-secondary" />
        <h3 className="text-lg font-semibold text-luxury-brown">Guide d'intégration</h3>
      </div>
      
      <div className="space-y-4">
        {integrations.map((integration, index) => (
          <div key={index} className="p-4 border border-gray-100 rounded-lg hover:bg-luxury-sand/10">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-secondary" />
              {integration.title}
            </h4>
            <p className="text-sm text-gray-600 mb-2">{integration.description}</p>
            <div className="text-sm text-gray-500">
              <strong>Clé API:</strong> {integration.apiKey}
            </div>
            <a 
              href={integration.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-secondary hover:text-secondary-light mt-2"
            >
              Documentation
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationGuide;