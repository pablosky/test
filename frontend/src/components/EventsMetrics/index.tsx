import React, {useState, useEffect} from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import { Chart } from "react-google-charts";
import DateTimePicker from 'react-datetime-picker';
import Container from 'react-bootstrap/Container';

const EVENTS_METRICS = gql`
  query eventsMetrics($from: ISO8601DateTime!, $to: ISO8601DateTime!, $rangeFilter: String!){ 
    eventsMetrics (from: $from, to: $to, rangeFilter: $rangeFilter) {
      metrics
    }
  }
`;

function LineChart({metrics_data, rangeFilter}:any){
  const options = {
    chart: {
      title: "Average values by:",
      subtitle: rangeFilter,
    },
  };

  const processed_data2 = metrics_data?.eventsMetrics?.metrics.map((element: any) => {
    let rObj = [];
    rObj[0] = new Date(element[0]);
    if(element[1]===null){
      rObj[1] = 0;
    }else{
      rObj[1] = parseFloat(element[1]);
    }
    return rObj;
  });
  
  console.log('metrics data' ,metrics_data);
  processed_data2.unshift(['DateTime','Average']);
  
  return(
    <React.Fragment>
      <Container>
        <Chart
          chartType="Line"
          width="100%"
          height="500px"
          data={processed_data2}
          options={options}
          />
      </Container>
    </React.Fragment>
  );
}

function EventsMetrics() {
  
  const [from, setFrom] = useState(new Date());
  const [to, setTo] =  useState(new Date());
  const [rangeFilter, setRangeFilter] =  useState('day');

  const { loading, error, data } = useQuery(EVENTS_METRICS, { variables: {from: moment(from).toISOString(),to: moment(to).toISOString(), rangeFilter: rangeFilter}});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <React.Fragment>
      <Form style={{backgroundColor: 'white'}}>
        <h1 style={{color: 'black'}}>Metrics!</h1>
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
          <label style={{color: 'black'}}>
            Pick your range:
            <select value={rangeFilter} onChange={(e) => setRangeFilter(e.target.value)}>
              <option value="day">Day</option>
              <option value="hour">Hour</option>
              <option value="minute">Minute</option>
            </select>
          </label>
        </Form.Group>
      </Form>
      {data && (
        <LineChart metrics_data={data} rangeFilter={rangeFilter} />
        )
      }
    </React.Fragment>
  );
}

export { EventsMetrics } ;