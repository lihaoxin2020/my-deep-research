import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { ApiProvider } from './contexts/ApiContext';
import { ResearchProvider } from './contexts/ResearchContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <ChakraProvider>
      <ApiProvider>
        <ResearchProvider>
          <Router>
            <Box minH="100vh">
              <Header />
              <Box as="main">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                </Routes>
              </Box>
            </Box>
          </Router>
        </ResearchProvider>
      </ApiProvider>
    </ChakraProvider>
  );
}

export default App;
