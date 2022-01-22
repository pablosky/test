import React from 'react';
import './App.css';
import {EventCreator} from './components/EventCreator';
import {EventsSearch} from './components/EventsSearch';
import {Events} from './components/Events';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';

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
          <Container>
            <h1>Test</h1>
            <Row xs={2}>
              <Col>
                <EventCreator/>
              </Col>
              <Col>
                <h2>Events List</h2>
                <EventsSearch searchValue={searchValue} setSearchValue={setSearchValue}></EventsSearch>
                <ListGroup><Events /></ListGroup>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
