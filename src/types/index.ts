export interface ApiConfig {
  provider: LLMProvider;
  apiKey: string;
  model?: string;
}

export enum LLMProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE = 'google',
  CUSTOM = 'custom',
}

export interface ResearchRequest {
  query: string;
  maxDepth?: number;
  apiConfig: ApiConfig;
}

export interface ResearchResponse {
  text: string;
  bibliography: Citation[];
  sources: Source[];
}

export interface Citation {
  id: string;
  title: string;
  url: string;
  author?: string;
  date?: string;
}

export interface Source {
  id: string;
  title: string;
  url: string;
  content: string;
  relevance: number;
}

export interface ResearchStep {
  query: string;
  sources: Source[];
  summary: string;
  followUpQueries: string[];
}

export interface ResearchSession {
  id: string;
  query: string;
  steps: ResearchStep[];
  finalResponse: ResearchResponse;
  createdAt: Date;
}