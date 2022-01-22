import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  useQuery,
  useMutation,
  gql
} from "@apollo/client";

const CREATE_EVENT = gql`
    mutation CreateEvent($description: String!, $name: String!, $value: Int!){
      createEvent(input: { description: $description, name: $name, value: $value }) {
        id
        description
        category
        completed
        name
        value
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
      value
    }
  }
`;

function EventCreator(){

  const [createEvent, { loading, error }]= useMutation(CREATE_EVENT, {refetchQueries: [
    EVENTS, // DocumentNode object parsed with gql
    'events' // Query name
  ],});

  const [descriptionForm, setDescriptionForm] = useState('');
  const [nameForm, setNameForm] = useState('');
  const [valueForm, setValueForm] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault();
    alert(`The event you entered was: ${nameForm} with value: ${valueForm}`);
    createEvent({variables: {description: descriptionForm, name: nameForm, value: parseInt(valueForm)}})
    setNameForm('');
    setDescriptionForm('');
    setValueForm('');
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <React.Fragment>
      <h1>Events creator</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name={'name'}
            value={nameForm}
            onChange={(e) => setNameForm(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formValue">
          <Form.Label>Value</Form.Label>
          <Form.Control
            type={'number'}
            name={'value'}
            value={valueForm}
            onChange={(e) => setValueForm(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
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