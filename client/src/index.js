import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';
import App from './app';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:3000/graphql'}),
});
const hist = createBrowserHistory();

render((
    <ApolloProvider client={client}>
        <Router history={hist}>
            <App />
        </Router>
    </ApolloProvider>
  ),
  document.getElementById('root')
);
