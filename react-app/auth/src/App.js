import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom'
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Users from './components/Users';


class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Welcome to the Users Portal</h1>
        <h2>Sign-Up or Login to View Users</h2>
        <NavLink to='/signup'>Sign-Up</NavLink>
        <NavLink to='/signin'>Login</NavLink>
        <NavLink to='/users'>Users</NavLink>


        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route exact path='/users' component={Users} />

      </div>
    );
  }
}

export default App;
