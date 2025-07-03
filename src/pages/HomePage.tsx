import React from 'react';
import { Container, VStack, Heading, Text, Box } from '@chakra-ui/react';
import ResearchForm from '../components/ResearchForm';
import ResearchResults from '../components/ResearchResults';
import { useResearch } from '../contexts/ResearchContext';

const HomePage: React.FC = () => {
  const { currentSession } = useResearch();

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={2}>Deep Research</Heading>
          <Text fontSize="lg" color="gray.600">
            Conduct comprehensive research with AI assistance
          </Text>
        </Box>
        
        <ResearchForm />
        
        {currentSession && <ResearchResults />}
      </VStack>
    </Container>
  );
};

export default HomePage;