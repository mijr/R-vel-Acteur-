import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client'; // <-- import le client configuré

import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import NavigationScroll from 'layout/NavigationScroll';
import ThemeCustomization from 'themes';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeCustomization>
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeCustomization>
    </ApolloProvider>
  );
}
