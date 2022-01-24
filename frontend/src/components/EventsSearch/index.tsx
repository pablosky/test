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
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';

interface Event {
  id: 1,
  category: '',
  description: '',
  completed: false,
  name: '',
  value: 0,
  createdAt: ''
}

interface EventsList {
  events: Event[];
}

const EVENTS = gql`
  query events($from: ISO8601DateTime!, $to: ISO8601DateTime!){ 
    events (from: $from, to: $to) {
      id
      name
      category
      description
      completed
      value
      createdAt
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
      value
    }
  }
`;


function EventsSearch({searchValue, setSearchValue} : any){

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [from, setFrom] = useState(new Date());
  const [to, setTo] =  useState(new Date());
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

  const onFilterClick = (event: any) => {
    event.preventDefault();
    console.log("THE FILTERED DATA IS", data);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <React.Fragment>
       <Form onSubmit={onFilterClick} style={{backgroundColor: 'white'}}>
        <h1 style={{color: 'black'}}>Events search</h1>
        <Form.Group>
            <DateTimePicker
              onChange={setFrom}
              value={from}
            />
          </Form.Group>
          <Form.Group>
            <DateTimePicker
              onChange={setTo}
              value={to}
            />
          </Form.Group>
          <button>Filter</button>
       </Form>
       {data.events.map(({ id, name, value, category, description, completed, createdAt }: Event) => (
        <ListGroup.Item key={id}>
          <Row >
            <Col xs={8}>
              <p>
                name: {name} value: {value}
              </p>
              <p>created_at: {createdAt}</p>
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
      ))}
    </React.Fragment>
  );
}


export { EventsSearch };