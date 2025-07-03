import React from 'react';
import {
  Container,
  VStack,
  Heading,
  Text,
  Box,
  List,
  ListItem,
  Button,
  Flex,
  Badge,
  Divider,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useResearch } from '../contexts/ResearchContext';
import { format } from 'date-fns';

const HistoryPage: React.FC = () => {
  const { sessions, clearAllSessions } = useResearch();

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Heading size="xl" mb={2}>Research History</Heading>
            <Text fontSize="lg" color="gray.600">
              View your past research sessions
            </Text>
          </Box>
          
          {sessions.length > 0 && (
            <Button colorScheme="red" onClick={clearAllSessions}>
              Clear All History
            </Button>
          )}
        </Flex>
        
        {sessions.length === 0 ? (
          <Alert status="info">
            <AlertIcon />
            You haven't conducted any research yet. Start a new research query from the home page.
          </Alert>
        ) : (
          <List spacing={4}>
            {sessions.map((session) => (
              <ListItem key={session.id} p={4} borderWidth="1px" borderRadius="lg">
                <Flex justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Heading size="md">{session.query}</Heading>
                  <Badge>
                    {format(new Date(session.createdAt), 'MMM d, yyyy h:mm a')}
                  </Badge>
                </Flex>
                
                <Divider my={2} />
                
                <Text noOfLines={3} color="gray.600">
                  {session.finalResponse.text}
                </Text>
                
                <Flex mt={4} justifyContent="flex-end">
                  <Button size="sm" colorScheme="blue">
                    View Details
                  </Button>
                </Flex>
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Container>
  );
};

export default HistoryPage;