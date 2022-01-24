import React, {useState, useEffect} from 'react';
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
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { Chart } from "react-google-charts";
import DateTimePicker from 'react-datetime-picker';

const ledata = [
  [
    "Day",
    "Guardians of the Galaxy",
    "The Avengers",
    "Transformers: Age of Extinction",
  ],
  [1, 37.8, 80.8, 41.8],
  [2, 30.9, 69.5, 32.4],
  [3, 25.4, 57, 25.7],
  [4, 11.7, 18.8, 10.5],
  [5, 11.9, 17.6, 10.4],
  [6, 8.8, 13.6, 7.7],
  [7, 7.6, 12.3, 9.6],
  [8, 12.3, 29.2, 10.6],
  [9, 16.9, 42.9, 14.8],
  [10, 12.8, 30.9, 11.6],
  [11, 5.3, 7.9, 4.7],
  [12, 6.6, 8.4, 5.2],
  [13, 4.8, 6.3, 3.6],
  [14, 4.2, 6.2, 3.4],
];

const EVENTS_METRICS = gql`
  query eventsMetrics($from: ISO8601DateTime!, $to: ISO8601DateTime!, $rangeFilter: String!){ 
    eventsMetrics (from: $from, to: $to, rangeFilter: $rangeFilter) {
      metrics
    }
  }
`;

function LineChart({data, rangeFilter}:any){
  const options = {
    chart: {
      title: "Average values",
      subtitle: rangeFilter,
    },
  };
  console.log('metrics', data);
  console.log('rangefilter', rangeFilter);
  // if(data? && data?.metrics?.length > 0){
  //   // data?.metrics?.map((obj: any) => {
  //   //       let rObj = [];
  //   //       rObj[0] = new Date(obj[0]);
  //   //       if(obj[1]===null){
  //   //         rObj[1] = 0;
  //   //       }else{
  //   //       rObj[1] = parseFloat(obj[1]);
  //   //       }
  //   //       return rObj
  //   //     });
  //   console.log('dsa');
  // }
  //console.log('metrics', data?.metrics?.length);

  //if (data && data?.metrics?.length == 0) return <p>No data! choose another date...</p>;
  const numbers = [4, 9, 16, 25];
  const miles = data?.map(function(element:any) {
    let rObj = [];
    rObj[0] = new Date(element[0]);
    if(element[1]===null){
      rObj[1] = 0;
    }else{
    rObj[1] = parseFloat(element[1]);
    }
    return rObj
  });
  
  console.log('dsa', miles);

  return(
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={ledata}
      options={options}
      />
  );
}

function EventsMetrics() {
  
  const [from, setFrom] = useState(new Date());
  const [to, setTo] =  useState(new Date());
  const [rangeFilter, setRangeFilter] =  useState('day');
  const [metrics, setMetrics] = useState([]);

  const { loading, error, data } = useQuery(EVENTS_METRICS, { variables: {from: moment(from).toISOString(),to: moment(to).toISOString(), rangeFilter: rangeFilter}});
  
  useEffect(() => {
    useQuery(EVENTS_METRICS, { variables: {from: moment(from).toISOString(),to: moment(to).toISOString(), rangeFilter: rangeFilter}}).then(data => setMetrics(data.metrics));
      console.log(metrics);
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <React.Fragment>
      <h1>Metrics!</h1>
      <Form >
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
        <Form.Group>
          <label>
            Pick your favorite flavor:
            <select value={rangeFilter} onChange={(e) => setRangeFilter(e.target.value)}>
              <option value="day">Day</option>
              <option value="hour">Hour</option>
              <option value="minute">Minute</option>
            </select>
          </label>
        </Form.Group>
      </Form>
     <LineChart metrics={data.metrics} rangeFilter={rangeFilter}/>
    </React.Fragment>
  );

}

export { EventsMetrics } ;