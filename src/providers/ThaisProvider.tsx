import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeThais } from '../services/thais';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ThaisContext = createContext<{
  isInitialized: boolean;
  initialize: (apiKey: string) => void;
}>({
  isInitialized: false,
  initialize: () => {}
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2
    }
  }
});

export const ThaisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem('thais_api_key');
    if (apiKey) {
      initialize(apiKey);
    }
  }, []);

  const initialize = (apiKey: string) => {
    try {
      initializeThais(apiKey);
      localStorage.setItem('thais_api_key', apiKey);
      setIsInitialized(true);
    } catch (error) {
      console.error('Erreur d\'initialisation THAIS:', error);
      setIsInitialized(false);
    }
  };

  return (
    <ThaisContext.Provider value={{ isInitialized, initialize }}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThaisContext.Provider>
  );
};

export const useThaisContext = () => {
  const context = useContext(ThaisContext);
  if (!context) {
    throw new Error('useThaisContext doit être utilisé dans un ThaisProvider');
  }
  return context;
};