import './App.css';
import React from 'react';
import { BikeContainer } from './component/bike/BikeContainer';

function App() {
  return (
    <div className="wrapper">
      <div>
        <div><h1>Awesome Bike Rental</h1></div>
        <BikeContainer />
      </div> 
    </div>
  );
}

export default App;
