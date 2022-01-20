import React from 'react';
import { gql, useMutation } from '@apollo/client';

function EventCreator(){

  const onClickCreate = (msg: String) => {
    alert(msg);
  };

  return (
    <React.Fragment>
      <h1>Events creator</h1>
      <form>
        <input></input>
        <button onSubmit={() => onClickCreate('clickccccc')} >Press me am a button!</button>
      </form>
    </React.Fragment>
  );
}

export { EventCreator };