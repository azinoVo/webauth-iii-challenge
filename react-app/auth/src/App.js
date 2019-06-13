import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom'
import './App.css';
import SignUp from '../components/signup';
import SignIn from '../components/SignIn';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to the Users Portal</h1>
        <h2>Sign-Up or Login to View Users</h2>
        <NavLink to=''>Sign-Up</NavLink>
        <NavLink to=''>Login</NavLink>



        <Route path='/' component={App} />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={SignIn} />
      </div>
    );
  }
}

export default App;
