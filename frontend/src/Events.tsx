import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

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

function Events() {
  const readEvent = (eventId: Number) => {
    alert(`read! ${eventId}`)
  };
  const onRead = (description: String) => {
    alert(`read! ${description}`);
  };

  const { loading, error, data } = useQuery(EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.events.map(({ id, category, description }: Event) => (
    <div key={description}>
      <p>
        category: {category} description: {description}
      </p>
      <button onClick={()=>readEvent(id)}> read</button>
    </div>
  ));
}

export { Events };