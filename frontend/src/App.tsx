import React from 'react';
import './App.css';
import {EventCreator} from './EventCreator'
import {EventsSearch} from './EventsSearch'
import {Events} from './Events'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";



function EventsCounter(){
  return (
    <h1>Events counter</h1>
  );
}

const EVENTS = gql`
  query { 
      events {
      id
      category
      description
    }
  }
`;

interface Event {
  id: 1,
  category: '0',
  description: 'descript'
}
const client = new ApolloClient({
  uri: 'http://backend.localhost/graphql',
  cache: new InMemoryCache()
});

const App: React.FC = () => {
    
  const [searchValue, setSearchValue] = React.useState('state data');

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h2>Events!</h2>
          <div>
            <EventsSearch searchValue={searchValue} setSearchValue={setSearchValue}></EventsSearch>
            <EventsCounter />
            <Events />
            <EventCreator/>
          </div>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
