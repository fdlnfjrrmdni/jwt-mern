import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';

import Home from './components/home.component';
import Login from './components/login.component';
import Register from './components/register.component';

class App extends Component {
  render() {
    return(
      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    )
  }
}

export default App;