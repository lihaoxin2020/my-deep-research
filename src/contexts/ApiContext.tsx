import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ApiConfig, LLMProvider } from '../types';

interface ApiContextType {
  apiConfig: ApiConfig;
  setApiConfig: (config: ApiConfig) => void;
  isConfigured: boolean;
}

const defaultApiConfig: ApiConfig = {
  provider: LLMProvider.OPENAI,
  apiKey: '',
  model: '',
};

const ApiContext = createContext<ApiContextType>({
  apiConfig: defaultApiConfig,
  setApiConfig: () => {},
  isConfigured: false,
});

export const useApi = () => useContext(ApiContext);

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [apiConfig, setApiConfig] = useState<ApiConfig>(() => {
    // Try to load from localStorage
    const savedConfig = localStorage.getItem('apiConfig');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        console.error('Failed to parse saved API config', e);
      }
    }
    return defaultApiConfig;
  });

  const handleSetApiConfig = (config: ApiConfig) => {
    setApiConfig(config);
    // Save to localStorage
    localStorage.setItem('apiConfig', JSON.stringify(config));
  };

  const isConfigured = Boolean(apiConfig.apiKey);

  return (
    <ApiContext.Provider value={{ apiConfig, setApiConfig: handleSetApiConfig, isConfigured }}>
      {children}
    </ApiContext.Provider>
  );
};