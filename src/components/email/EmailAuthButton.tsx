import React, { useState } from 'react';
import { emailIntegration } from '../../services/email-integration';
import { apiConfig } from '../../services/api-config';

interface EmailAuthButtonProps {
  isDarkMode: boolean;
}

const EmailAuthButton: React.FC<EmailAuthButtonProps> = ({ isDarkMode }) => {
  const [error, setError] = useState<string | null>(null);

  const handleAuth = () => {
    try {
      const config = apiConfig.getConfig('gmail');
      if (!config?.clientId || !config?.clientSecret) {
        setError('Configuration Gmail non disponible. Veuillez configurer vos identifiants dans les paramètres.');
        return;
      }

      const authUrl = emailIntegration.getAuthUrl();
      window.location.href = authUrl;
    } catch (err) {
      setError('Erreur lors de la connexion à Gmail. Veuillez réessayer.');
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleAuth}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          isDarkMode
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-secondary hover:bg-secondary-light'
        } text-white`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.64 12.2c0-.63-.06-1.25-.16-1.84H12v3.49h4.84a4.14 4.14 0 0 1-1.79 2.71v2.26h2.9a8.7 8.7 0 0 0 2.69-6.62z" />
          <path d="M12 21c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.73H3.95v2.33A8.98 8.98 0 0 0 12 21z" />
          <path d="M6.95 13.69a5.41 5.41 0 0 1 0-3.42V7.94H3.95a9 9 0 0 0 0 8.08l3-2.33z" />
          <path d="M12 6.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.98 8.98 0 0 0 12 3a8.98 8.98 0 0 0-8.05 4.94l3 2.33C7.65 8.17 9.64 6.58 12 6.58z" />
        </svg>
        <span>Se connecter avec Gmail</span>
      </button>

      {error && (
        <div className={`p-4 rounded-lg ${
          isDarkMode 
            ? 'bg-red-500/10 text-red-400' 
            : 'bg-red-100 text-red-600'
        }`}>
          {error}
        </div>
      )}

      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Pour configurer l&apos;intégration Gmail, rendez-vous dans{' '}
        <a 
          href="/settings?tab=integrations" 
          className={`${
            isDarkMode ? 'text-blue-400' : 'text-secondary'
          } hover:underline`}
        >
          Paramètres &amp; Intégrations
        </a>
      </p>
    </div>
  );
};

export default EmailAuthButton;