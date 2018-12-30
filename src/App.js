import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';

import logo from './logo.svg';

import { Redirect } from 'react-router-dom';
import Home from './Home';
import Order from './Order';
import Header from './Header';
import Delivery from './Delivery';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/order" component={Order}/>
          <Route exact path="/Delivery" component={Delivery}/>
          <Route exact path="/header" component={Header} />
          </div>
      </Router>
    );
  }
}

export default App;
