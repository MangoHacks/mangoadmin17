import React, { Component } from 'react';
import Auth from './core/auth';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import Login from './Containers/Login';
import Dashboard from './Containers/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    var isAuthenticated = Auth.isAuthenticated() || false;
    this.state = {
      isAuthenticated: Auth.isAuthenticated()
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    Auth.destroyToken();
    this.setState((prevState, props) => {
      return {
        isAuthenticated: false
      };
    });
  }

  onLogin() {
    if (Auth.isAuthenticated()) {
      this.setState((prevState, props) => {
        return {
          isAuthenticated: true
        };
      });
    }
  }

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Router>
        <div>
          <nav className="nav has-shadow">
            <div className="nav-left">
              <span className="nav-item">
                <h1 className="subtitle">MangoHacks Admin</h1>
              </span>
            </div>
          </nav>

          {isAuthenticated ?
            <Dashboard 
              onLogout={this.onLogout}
            />:
            <Login
              onLogin={this.onLogin}
            />
          }
        </div>
      </Router>
    );
  }
}

export default App;
