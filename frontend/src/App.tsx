import React, {useState} from 'react';
import './App.css';
import {EventCreator} from './components/EventCreator';
import {EventsSearch} from './components/EventsSearch';
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
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const client = new ApolloClient({
  uri: 'http://backend.localhost/graphql',
  cache: new InMemoryCache()
});

function CreateEventModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} size="lg">
        Add Event
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EventCreator />
        </Modal.Body>
      </Modal>
    </>
  );
}

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
                <CreateEventModal />
              </Col>
              <Col>
                <EventsSearch />
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
