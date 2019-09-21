import React from 'react';
import Chart from './chart';
import Datepicker from './datepicker';
import Timepicker from './timepicker';
import './App.css';

function App() {
  return (
    <div className="App">
      <Chart />
      <Datepicker />
      <Timepicker />
    </div>
  );
}

export default App;
