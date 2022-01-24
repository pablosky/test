import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {EventsMetrics} from '../components/EventsMetrics';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  gql,
} from "@apollo/client";
//import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import moment from 'moment';
import fetch from 'cross-fetch'; 

const httpLink = new HttpLink({ uri: 'http://backend.localhost/graphql', fetch });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const EVENTS_METRICS = gql`
  query eventsMetrics($from: ISO8601DateTime!, $to: ISO8601DateTime!, $rangeFilter: String!){ 
    eventsMetrics (from: $from, to: $to, rangeFilter: $rangeFilter) {
      metrics
    }
  }
`;

const metrics_response = [['2022-01-22', '50.7745277269957343'],
                          ['2022-01-23', '50.5631944444444444'],
                          ['2022-01-24', '73.3138856476079347']];

 const mocks = [
  {
    request: {
      query: EVENTS_METRICS,
      variables: {from: moment(new Date()).toISOString(),to: moment(new Date()).toISOString(), rangeFilter: 'day'},
    },
    result: {
      data: {
        eventsMetrics: { metrics: metrics_response },
      },
    },
  },
];


it('renders without error', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ApolloProvider client={client}>
    <MockedProvider mocks={mocks} addTypename={false}>
      <EventsMetrics />
    </MockedProvider>
  </ApolloProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});