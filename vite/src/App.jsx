import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';

import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import NavigationScroll from 'layout/NavigationScroll';
import ThemeCustomization from 'themes';

// ✅ Required imports for date picker
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeCustomization>
          <NavigationScroll>
            <RouterProvider router={router} />
          </NavigationScroll>
        </ThemeCustomization>
      </LocalizationProvider>
    </ApolloProvider>
  );
}
