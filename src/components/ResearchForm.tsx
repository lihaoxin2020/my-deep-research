import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Heading,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useResearch } from '../contexts/ResearchContext';
import { useApi } from '../contexts/ApiContext';

const ResearchForm: React.FC = () => {
  const { startResearch, isLoading, error } = useResearch();
  const { isConfigured } = useApi();
  
  const [query, setQuery] = useState('');
  const [maxDepth, setMaxDepth] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      startResearch(query, maxDepth);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Heading size="md" mb={4}>Research Query</Heading>
      
      {!isConfigured && (
        <Alert status="warning" mb={4}>
          <AlertIcon />
          Please configure your API settings before starting research.
        </Alert>
      )}
      
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Research Question</FormLabel>
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your research question"
              size="lg"
              rows={4}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Maximum Research Depth</FormLabel>
            <NumberInput 
              min={1} 
              max={5} 
              value={maxDepth} 
              onChange={(_, value) => setMaxDepth(value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Button 
            type="submit" 
            colorScheme="blue" 
            isLoading={isLoading}
            loadingText="Researching..."
            isDisabled={!isConfigured || !query.trim() || isLoading}
          >
            Start Research
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ResearchForm;