import React from 'react';


import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import productList from './productList';
import priceCalculator from './calculator';

function App() {

  return (
    <div className="App">
    <Router>
      <Route path='/' exact component={productList} />
      <Route path='/price-calculator' component={priceCalculator} />
    </Router>
      
  </div>
  );
}

export default App;
