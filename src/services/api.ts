import axios from 'axios';
import { ApiConfig, LLMProvider, ResearchRequest, ResearchResponse } from '../types';

// Create axios instances for different providers
const createApiClient = (config: ApiConfig) => {
  const baseURL = getProviderBaseURL(config.provider);
  
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    }
  });
};

const getProviderBaseURL = (provider: LLMProvider): string => {
  switch (provider) {
    case LLMProvider.OPENAI:
      return 'https://api.openai.com/v1';
    case LLMProvider.ANTHROPIC:
      return 'https://api.anthropic.com/v1';
    case LLMProvider.GOOGLE:
      return 'https://generativelanguage.googleapis.com/v1';
    case LLMProvider.CUSTOM:
      return '';
    default:
      return '';
  }
};

const getDefaultModel = (provider: LLMProvider): string => {
  switch (provider) {
    case LLMProvider.OPENAI:
      return 'gpt-4o';
    case LLMProvider.ANTHROPIC:
      return 'claude-3-opus-20240229';
    case LLMProvider.GOOGLE:
      return 'gemini-1.5-pro';
    default:
      return '';
  }
};

// Mock data for demonstration purposes
const generateMockResponse = (query: string, maxDepth: number): ResearchResponse => {
  return {
    text: `# Research Report: ${query}\n\n## Introduction\nThis is a comprehensive research report on "${query}" with a research depth of ${maxDepth}.\n\n## Key Findings\n1. First major finding about ${query}\n2. Second major finding about the topic\n3. Third important insight discovered during research\n\n## Analysis\nThe analysis shows that this topic has significant implications in multiple domains. Further research could explore additional aspects.\n\n## Conclusion\nBased on the research conducted, we can conclude that ${query} is an important area with evolving understanding and applications.`,
    bibliography: [
      { title: "Understanding " + query, authors: "Smith, J. & Johnson, P.", year: "2024", url: "https://example.com/research1" },
      { title: "Advanced Research on " + query, authors: "Williams, A.", year: "2023", url: "https://example.com/research2" },
      { title: "The Future of " + query, authors: "Brown, M. et al.", year: "2024", url: "https://example.com/research3" }
    ],
    sources: [
      { title: "Example Source 1", url: "https://example.com/source1", snippet: "This source provides valuable information about " + query },
      { title: "Example Source 2", url: "https://example.com/source2", snippet: "Additional context and background on the topic" },
      { title: "Example Source 3", url: "https://example.com/source3", snippet: "Latest developments and future directions" }
    ]
  };
};

export const conductResearch = async (request: ResearchRequest): Promise<ResearchResponse> => {
  const { query, apiConfig, maxDepth = 3 } = request;
  const model = apiConfig.model || getDefaultModel(apiConfig.provider);
  
  // For demo purposes, use mock data if API key starts with "demo" or "test"
  if (apiConfig.apiKey.startsWith('demo') || apiConfig.apiKey.startsWith('test')) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return generateMockResponse(query, maxDepth);
  }
  
  try {
    // This is a simplified implementation
    // In a real app, you would implement the deep research algorithm here
    // with multiple steps of search, analysis, and follow-up queries
    
    const client = createApiClient(apiConfig);
    
    // For demonstration purposes, we're just making a single call to the LLM
    // In a real implementation, this would involve multiple steps and web searches
    
    let response;
    
    switch (apiConfig.provider) {
      case LLMProvider.OPENAI:
        response = await client.post('/chat/completions', {
          model,
          messages: [
            { role: 'system', content: 'You are a research assistant. Conduct deep research on the given topic and provide a comprehensive report with citations.' },
            { role: 'user', content: `Conduct deep research on: ${query}. Use a maximum depth of ${maxDepth} iterations.` }
          ],
          temperature: 0.7
        });
        
        // Parse the response
        const openAIContent = response.data.choices[0].message.content;
        
        // In a real implementation, you would parse the content to extract bibliography and sources
        return {
          text: openAIContent,
          bibliography: [],
          sources: []
        };
        
      case LLMProvider.ANTHROPIC:
        response = await client.post('/messages', {
          model,
          messages: [
            { role: 'user', content: `Conduct deep research on: ${query}. Use a maximum depth of ${maxDepth} iterations.` }
          ],
          system: 'You are a research assistant. Conduct deep research on the given topic and provide a comprehensive report with citations.',
          temperature: 0.7
        });
        
        // Parse the response
        const anthropicContent = response.data.content[0].text;
        
        return {
          text: anthropicContent,
          bibliography: [],
          sources: []
        };
        
      case LLMProvider.GOOGLE:
        response = await client.post(`/models/${model}:generateContent`, {
          contents: [
            { role: 'user', parts: [{ text: `Conduct deep research on: ${query}. Use a maximum depth of ${maxDepth} iterations.` }] }
          ],
          systemInstruction: { parts: [{ text: 'You are a research assistant. Conduct deep research on the given topic and provide a comprehensive report with citations.' }] },
          generationConfig: {
            temperature: 0.7
          }
        }, {
          params: {
            key: apiConfig.apiKey
          },
          headers: {
            'Authorization': undefined
          }
        });
        
        // Parse the response
        const googleContent = response.data.candidates[0].content.parts[0].text;
        
        return {
          text: googleContent,
          bibliography: [],
          sources: []
        };
        
      default:
        throw new Error(`Provider ${apiConfig.provider} not supported`);
    }
  } catch (error) {
    console.error('Error conducting research:', error);
    throw error;
  }
};