import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { ApiConfig, LLMProvider } from '../types';
import { useApi } from '../contexts/ApiContext';

const ApiConfigForm: React.FC = () => {
  const { apiConfig, setApiConfig } = useApi();
  const toast = useToast();
  
  const [formState, setFormState] = useState<ApiConfig>({
    provider: apiConfig.provider,
    apiKey: apiConfig.apiKey,
    model: apiConfig.model,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiConfig(formState);
    toast({
      title: 'API Configuration Saved',
      description: 'Your API configuration has been saved successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Heading size="md" mb={4}>API Configuration</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Provider</FormLabel>
            <Select 
              name="provider" 
              value={formState.provider} 
              onChange={handleChange}
            >
              <option value={LLMProvider.OPENAI}>OpenAI</option>
              <option value={LLMProvider.ANTHROPIC}>Anthropic</option>
              <option value={LLMProvider.GOOGLE}>Google</option>
              <option value={LLMProvider.CUSTOM}>Custom</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>API Key</FormLabel>
            <Input
              name="apiKey"
              type="password"
              value={formState.apiKey}
              onChange={handleChange}
              placeholder="Enter your API key"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Model (Optional)</FormLabel>
            <Input
              name="model"
              value={formState.model || ''}
              onChange={handleChange}
              placeholder="Leave blank for default model"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Save Configuration
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ApiConfigForm;