import React, { Component } from 'react';
import Auth from '../core/auth';
import axios from 'axios';

import {
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}

		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this._login = this._login.bind(this);
	}

	onEmailChange(event) {
		var val = event.target.value;
		this.setState((prevState, props) => ({
			username: val
		}));
	}

	onPasswordChange(event) {
		var val = event.target.value;
		this.setState((prevState, props) => ({
			password: val
		}));
	}

	_login(event) {
		event.preventDefault();
		const {onLogin} = this.props;
		const data = {
	      client_id: 2,
	      client_secret: 'XVlAlHa8tQgsSydfR8DPN1tYai1bCgJk9qw0JL87',
	      grant_type: 'password',
	      username: this.state.username,
	      password: this.state.password
	    };

      	axios.post("http://mango17.dev/oauth/token", data)
			.then(response => response.data)
			.then(data => {
				Auth.setToken(data.access_token, data.expires_in)
				onLogin();
			})
			.catch(data => alert("check credentials and try again"));
	}

	render() {
		return (
			<div className="section">
				<div className="container">
					<div className="columns">
						<form onSubmit={this._login} className="column is-half is-offset-one-quarter">
							<h1 className="title is-2">Log In</h1>
						  	<p className="control has-icon">
								<input 
									onChange={this.onEmailChange}
									value={this.state.username}
									className="input" 
									type="email" 
									placeholder="Email" 
									required="true"/>
								<span className="icon is-small">
									<i className="fa fa-envelope"></i>
								</span>
							</p>
							<p className="control has-icon">
							    <input 
							    	onChange={this.onPasswordChange}
							    	value={this.state.password}
							    	className="input" 
							    	type="password" 
							    	placeholder="Password"
							    	required="true"
							    />
							    <span className="icon is-small">
							        <i className="fa fa-lock"></i>
							    </span>
							</p>
							<p className="control">
							  	<button 
							  		type="submit"
							  		className="button is-success">
							    	Login
							  	</button>
							</p>
						</form>
					</div>
				</div>
			</div>
		);
	}
}