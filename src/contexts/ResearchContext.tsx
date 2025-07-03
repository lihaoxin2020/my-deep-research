import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResearchRequest, ResearchResponse, ResearchSession } from '../types';
import { conductResearch } from '../services/api';
import { useApi } from './ApiContext';
import { v4 as uuidv4 } from 'uuid';

interface ResearchContextType {
  isLoading: boolean;
  error: string | null;
  currentSession: ResearchSession | null;
  sessions: ResearchSession[];
  startResearch: (query: string, maxDepth?: number) => Promise<void>;
  clearCurrentSession: () => void;
  clearAllSessions: () => void;
}

const ResearchContext = createContext<ResearchContextType>({
  isLoading: false,
  error: null,
  currentSession: null,
  sessions: [],
  startResearch: async () => {},
  clearCurrentSession: () => {},
  clearAllSessions: () => {},
});

export const useResearch = () => useContext(ResearchContext);

interface ResearchProviderProps {
  children: ReactNode;
}

export const ResearchProvider: React.FC<ResearchProviderProps> = ({ children }) => {
  const { apiConfig, isConfigured } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSession, setCurrentSession] = useState<ResearchSession | null>(null);
  const [sessions, setSessions] = useState<ResearchSession[]>([]);

  const startResearch = async (query: string, maxDepth = 3) => {
    if (!isConfigured) {
      setError('API is not configured. Please set your API key.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const request: ResearchRequest = {
        query,
        maxDepth,
        apiConfig,
      };

      const response = await conductResearch(request);

      const newSession: ResearchSession = {
        id: uuidv4(),
        query,
        steps: [],
        finalResponse: response,
        createdAt: new Date(),
      };

      setCurrentSession(newSession);
      setSessions(prev => [newSession, ...prev]);
    } catch (err) {
      console.error('Research error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCurrentSession = () => {
    setCurrentSession(null);
  };

  const clearAllSessions = () => {
    setSessions([]);
    setCurrentSession(null);
  };

  return (
    <ResearchContext.Provider
      value={{
        isLoading,
        error,
        currentSession,
        sessions,
        startResearch,
        clearCurrentSession,
        clearAllSessions,
      }}
    >
      {children}
    </ResearchContext.Provider>
  );
};