import React from 'react';
import { Box, Flex, Heading, Button, useColorMode, HStack, Icon } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaCog, FaSearch, FaHistory } from 'react-icons/fa';

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  return (
    <Box as="header" py={4} px={6} borderBottomWidth="1px">
      <Flex justify="space-between" align="center">
        <Heading as={RouterLink} to="/" size="lg" cursor="pointer">
          Deep Research
        </Heading>
        
        <HStack spacing={4}>
          <Button
            as={RouterLink}
            to="/"
            variant={location.pathname === '/' ? 'solid' : 'ghost'}
            colorScheme="blue"
            leftIcon={<Icon as={FaSearch} />}
            size="sm"
          >
            Research
          </Button>
          
          <Button
            as={RouterLink}
            to="/history"
            variant={location.pathname === '/history' ? 'solid' : 'ghost'}
            colorScheme="blue"
            leftIcon={<Icon as={FaHistory} />}
            size="sm"
          >
            History
          </Button>
          
          <Button
            as={RouterLink}
            to="/settings"
            variant={location.pathname === '/settings' ? 'solid' : 'ghost'}
            colorScheme="blue"
            leftIcon={<Icon as={FaCog} />}
            size="sm"
          >
            Settings
          </Button>
          
          <Button onClick={toggleColorMode} size="sm">
            <Icon as={colorMode === 'light' ? FaMoon : FaSun} />
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;