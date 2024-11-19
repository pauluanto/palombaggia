import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiConfig, type APIConfig } from '../services/api-config';
import { testAPIConnection } from '../services/api-test';

interface APIContextType {
  config: APIConfig;
  status: Record<string, 'connected' | 'disconnected' | 'error'>;
  updateConfig: (api: keyof APIConfig, config: any) => Promise<void>;
  testConnection: (api: string) => Promise<boolean>;
}

const APIContext = createContext<APIContextType>({
  config: {},
  status: {},
  updateConfig: async () => {},
  testConnection: async () => false
});

export const APIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<Record<string, 'connected' | 'disconnected' | 'error'>>({});

  useEffect(() => {
    const checkAllConnections = async () => {
      const apis = ['chatgpt', 'gmail', 'googleCalendar', 'thais', 'pennylane'];
      
      for (const api of apis) {
        if (apiConfig.isConfigured(api as keyof APIConfig)) {
          const result = await testAPIConnection(api);
          setStatus(prev => ({
            ...prev,
            [api]: result.success ? 'connected' : 'error'
          }));
        }
      }
    };

    checkAllConnections();
  }, []);

  const updateConfig = async (api: keyof APIConfig, newConfig: any) => {
    try {
      apiConfig.saveConfig({
        ...apiConfig.getConfig(api),
        [api]: newConfig
      });

      const result = await testAPIConnection(api);
      setStatus(prev => ({
        ...prev,
        [api]: result.success ? 'connected' : 'error'
      }));
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        [api]: 'error'
      }));
      throw error;
    }
  };

  const testConnection = async (api: string): Promise<boolean> => {
    try {
      const result = await testAPIConnection(api);
      setStatus(prev => ({
        ...prev,
        [api]: result.success ? 'connected' : 'error'
      }));
      return result.success;
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        [api]: 'error'
      }));
      return false;
    }
  };

  return (
    <APIContext.Provider value={{
      config: apiConfig.getConfig('all') || {},
      status,
      updateConfig,
      testConnection
    }}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
};