import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  useQuery,
  useMutation,
  gql
} from "@apollo/client";

const CREATE_EVENT = gql`
    mutation CreateEvent($description: String!, $name: String!){
      createEvent(input: { description: $description, name: $name }) {
        id
        description
        category
        completed
      }
    }
  `;
  const EVENTS = gql`
  query { 
      events {
      id
      category
      description
      completed
    }
  }
`;

function EventCreator(){

  const [createEvent] = useMutation(CREATE_EVENT, {refetchQueries: [
    EVENTS, // DocumentNode object parsed with gql
    'events' // Query name
  ],});

  const [descriptionForm, setDescriptionForm] = useState('');
  const [nameForm, setNameForm] = useState('');


  const handleSubmit = (event:any) => {
    event.preventDefault();
    alert(`The description you entered was: ${descriptionForm}`);
    createEvent({variables: {description: descriptionForm, name: nameForm}})
  }

  return (
    <React.Fragment>
      <h1>Events creator</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
          <input
            className="text-muted"
            name={'name'}
            value={nameForm}
            onChange={(e) => setNameForm(e.target.value)}
          />
          <Form.Label>Description</Form.Label>
          <input
            className="text-muted"
            name={'description'}
            value={descriptionForm}
            onChange={(e) => setDescriptionForm(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" >
          Create
        </Button>
      </Form>
    </React.Fragment>
  );
}

export { EventCreator };