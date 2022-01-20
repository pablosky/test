import React from 'react';


function EventsSearch({searchValue, setSearchValue} : any){
  
  const onSearchValueChange = (event: any) => {
    setSearchValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <React.Fragment>
       <h1>Events search</h1>
       <input placeholder= "ola" onChange={onSearchValueChange} value={searchValue}/>
       <p>{searchValue}</p>
    </React.Fragment>
  );
}


export { EventsSearch };