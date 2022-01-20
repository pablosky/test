import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://backend.localhost/graphql',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query { 
        events {
        id
        category
      }
    }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(<App />, document.getElementById('root'));
