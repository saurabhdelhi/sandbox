import React, { Component } from 'react';

import { Login } from './account/login/Login.component.js';
import { Logout } from './account/logout/Logout.component.js';

import { AUTH_KEY } from './account/Account.service';

import './App.css';

class App extends Component {
  render() {
    if (this.login()) {
      return (
        <div className="UI-app">
          <header className="UI-app-header">
            <h1>
              Welcome to another React Application!
            </h1>
          </header>
          <Logout></Logout>
        </div>
      );
    } else {
      return (
        <Login></Login>
      )
    }
  }

  login() {
    if (localStorage.getItem(AUTH_KEY)) {
      return true;
    }
    let query = window.location.search.substr(1);
    let result = {};
    query.split('&').forEach(function(part) {
      let item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });

    if (result['token_json']) {
      localStorage.setItem(AUTH_KEY, result['token_json']);
      let here = window.location.origin;
      window.location.replace(here);
    }

    return false;
  }
}

export default App;
