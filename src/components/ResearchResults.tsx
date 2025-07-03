import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Link,
  List,
  ListItem,
  Badge,
  Flex,
  Button,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useResearch } from '../contexts/ResearchContext';

const ResearchResults: React.FC = () => {
  const { currentSession, isLoading, clearCurrentSession } = useResearch();

  if (isLoading) {
    return (
      <Center p={10}>
        <VStack>
          <Spinner size="xl" />
          <Text mt={4}>Conducting deep research...</Text>
        </VStack>
      </Center>
    );
  }

  if (!currentSession) {
    return null;
  }

  const { query, finalResponse } = currentSession;

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">Research Results</Heading>
        <Button size="sm" onClick={clearCurrentSession}>
          Clear Results
        </Button>
      </Flex>
      
      <VStack align="stretch" spacing={4}>
        <Box>
          <Text fontWeight="bold">Query:</Text>
          <Text>{query}</Text>
        </Box>
        
        <Divider />
        
        <Box>
          <Text fontWeight="bold">Research Report:</Text>
          <Box 
            p={4} 
            borderWidth="1px" 
            borderRadius="md" 
            bg="gray.50" 
            whiteSpace="pre-wrap"
          >
            {finalResponse.text}
          </Box>
        </Box>
        
        {finalResponse.bibliography && finalResponse.bibliography.length > 0 && (
          <>
            <Divider />
            <Box>
              <Heading size="sm" mb={2}>Bibliography</Heading>
              <List spacing={2}>
                {finalResponse.bibliography.map((citation) => (
                  <ListItem key={citation.id}>
                    <Link href={citation.url} isExternal color="blue.500">
                      {citation.title}
                    </Link>
                    {citation.author && (
                      <Text fontSize="sm">Author: {citation.author}</Text>
                    )}
                    {citation.date && (
                      <Text fontSize="sm">Date: {citation.date}</Text>
                    )}
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        )}
        
        {finalResponse.sources && finalResponse.sources.length > 0 && (
          <>
            <Divider />
            <Box>
              <Heading size="sm" mb={2}>Sources</Heading>
              <List spacing={3}>
                {finalResponse.sources.map((source) => (
                  <ListItem key={source.id} p={2} borderWidth="1px" borderRadius="md">
                    <Flex justifyContent="space-between" alignItems="center">
                      <Link href={source.url} isExternal color="blue.500">
                        {source.title}
                      </Link>
                      <Badge colorScheme={source.relevance > 0.7 ? "green" : "yellow"}>
                        Relevance: {(source.relevance * 100).toFixed(0)}%
                      </Badge>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default ResearchResults;