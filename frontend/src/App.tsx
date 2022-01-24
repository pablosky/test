import React, {useState} from 'react';
import './App.css';
import {EventCreator} from './components/EventCreator';
import {EventsSearch} from './components/EventsSearch';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {EventsMetrics} from './components/EventsMetrics';
import fetch from 'cross-fetch'; 

const httpLink = new HttpLink({ uri: 'http://backend.localhost/graphql', fetch });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
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
            <Row style={{width: '100%'}}>
              <EventsMetrics/>
            </Row>
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
