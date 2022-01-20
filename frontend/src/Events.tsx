import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql
} from "@apollo/client";

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

const READ_EVENT = gql`
    mutation ReadEvent($eventId: ID!){
      readEvent(input: {eventId: $eventId}) {
        id
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
  const { loading, error, data } = useQuery(EVENTS);

  const [completeEvent] = useMutation(READ_EVENT, {refetchQueries: [
    EVENTS, // DocumentNode object parsed with gql
    'events' // Query name
  ],});

  const readEvent = (eventId: Number) => {
    completeEvent({variables: { eventId: eventId}});
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.events.map(({ id, category, description, completed }: Event) => (
    <div key={description}>
      <p>
        category: {category} description: {description} completed: {completed.toString()}
      </p>
      <button onClick={()=>readEvent(id)}> read</button>
    </div>
  ));
}

export { Events };