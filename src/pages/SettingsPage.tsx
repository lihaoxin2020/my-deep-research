import React from 'react';
import { Container, VStack, Heading, Text, Box } from '@chakra-ui/react';
import ApiConfigForm from '../components/ApiConfigForm';

const SettingsPage: React.FC = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={2}>Settings</Heading>
          <Text fontSize="lg" color="gray.600">
            Configure your API settings for deep research
          </Text>
        </Box>
        
        <ApiConfigForm />
      </VStack>
    </Container>
  );
};

export default SettingsPage;