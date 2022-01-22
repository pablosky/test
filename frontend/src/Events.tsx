import React, {useState} from 'react';
import {
  useQuery,
  useMutation,
  gql
} from "@apollo/client";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';


const EVENTS = gql`
  query events($from: ISO8601DateTime!, $to: ISO8601DateTime!){ 
    events (from: $from, to: $to) {
      id
      name
      category
      description
      completed
    }
  }
`;

const READ_EVENT = gql`
    mutation ReadEvent($eventId: ID!){
      readEvent(input: {eventId: $eventId}) {
        id
        name
        description
        category
        completed
      }
    }
  `;

const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: ID!){
    deleteEvent(input: {eventId: $eventId}) {
      id
      name
      description
      category
      completed
    }
  }
`;

interface Event {
  id: 1,
  category: '0',
  description: 'descript',
  completed: false
}

function Events() {

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const from = moment(currentMonth)
    .startOf('month')
    .toISOString();
  const to = moment(currentMonth)
    .endOf('month')
    .toISOString();

  const { loading, error, data } = useQuery(EVENTS, { variables: {from: moment(from).toISOString(),to: moment(to).toISOString()}});

  const [completeEvent] = useMutation(READ_EVENT, {refetchQueries: [
    EVENTS, // DocumentNode object parsed with gql
    'events' // Query name
  ],});

  const [deleteEvent] = useMutation(DELETE_EVENT, {refetchQueries: [
    EVENTS, // DocumentNode object parsed with gql
    'events' // Query name
  ],});

  const clickDelete = (eventId: Number) => {
    deleteEvent({variables: { eventId: eventId}});
  };

  const readEvent = (eventId: Number) => {
    completeEvent({variables: { eventId: eventId}});
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.events.map(({ id, name, value, category, description, completed }: Event) => (
    <ListGroup.Item key={description}>
      <Row key={description}>
        <Col xs={8}>
          <p>
            name: {name} value: {value}
          </p>
          <p>
            category: {category} description: {description} completed: {completed.toString()}
          </p>
          <button onClick={()=>readEvent(id)}> read</button>
        </Col>
        <Col>
          <button onClick={()=>clickDelete(id)}> Delete!! </button>
        </Col>
      </Row>
    </ListGroup.Item>
  ));
}

export { Events };