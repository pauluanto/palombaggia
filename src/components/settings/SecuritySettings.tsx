import React from 'react';
import { Shield, Key, Smartphone, Lock } from 'lucide-react';

interface SecuritySettingsProps {
  isDarkMode: boolean;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sécurité</h3>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-slate-600' : 'bg-white'
              }`}>
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium">Mot de passe</h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Dernière modification il y a 30 jours
                </p>
              </div>
            </div>
            <button className={`text-sm ${
              isDarkMode ? 'text-blue-400' : 'text-secondary'
            }`}>
              Changer le mot de passe
            </button>
          </div>

          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-slate-600' : 'bg-white'
              }`}>
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium">Double authentification</h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Sécurisez votre compte avec la 2FA
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg text-white ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-secondary hover:bg-secondary-light'
            }`}>
              Activer la 2FA
            </button>
          </div>

          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-slate-600' : 'bg-white'
              }`}>
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium">Sessions actives</h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Gérez vos appareils connectés
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Chrome - MacBook Pro</p>
                    <p className="text-sm text-gray-500">Dernière activité: Il y a 2 minutes</p>
                  </div>
                  <button className="text-red-500 hover:text-red-600">
                    Déconnecter
                  </button>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Safari - iPhone</p>
                    <p className="text-sm text-gray-500">Dernière activité: Il y a 1 heure</p>
                  </div>
                  <button className="text-red-500 hover:text-red-600">
                    Déconnecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;