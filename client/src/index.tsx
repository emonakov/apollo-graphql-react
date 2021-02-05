import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
} from '@apollo/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from './store/store';
import { cache } from './cache';
import theme from './config/theme';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('token') || '',
    'client-version': '1.0.0',
  },
  typeDefs,
  resolvers: {},
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
