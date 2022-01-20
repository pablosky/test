import React from 'react';



function EventCreator(){

  const onClickCreate = (msg: String) => {
    alert(msg);
  };

  return (
    <React.Fragment>
      <h1>Events creator</h1>
      <button onClick={() => onClickCreate('clickccccc')} >Press me am a button!</button>
    </React.Fragment>
  );
}

export { EventCreator };