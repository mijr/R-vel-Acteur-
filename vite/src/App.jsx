import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { RouterProvider } from 'react-router-dom';

import router from 'routes'; // ta config de routes
import NavigationScroll from 'layout/NavigationScroll';
import ThemeCustomization from 'themes';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

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
