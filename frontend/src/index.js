import {
  Box,
  ChakraProvider,
  ColorModeScript,
  DarkMode,
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { dark } from './themes/theme';
import './themes/style.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const queryClient = new QueryClient();

root.render(
  <ChakraProvider theme={dark}>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <DarkMode>
          <Box bg="bg.dark" color="white">
            <App />
          </Box>
        </DarkMode>
      </QueryClientProvider>
    </StrictMode>
  </ChakraProvider>
);
