import React, { Component } from 'react';
import Auth from '../core/auth';
import axios from 'axios';

import AttendeeTable from '../Components/AttendeeTable';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attendees : null
		};
	}

	fetchAttendees() {
		var token = Auth.getToken();
		if (token) {
			axios.get("http://mango17.dev/api/attendees", {
				headers: {'Authorization': `Bearer ${token}` }
			}).then(response => {
				this.setState((prevState, props) => ({
					attendees: response.data
				}));
			});
		}
	}

	componentDidMount() {
		this.fetchAttendees();
	}

	render() {
		const {onLogout} = this.props;

		return (
			<div className="section">
				<div className="container">
					<div className="columns">
						<div className="column">
							<h1 className="title is-2">Admin Dashboard</h1>
						</div>
						<button onClick={() => onLogout()} className="button">Logout</button>
					</div>
					<AttendeeTable
						attendees={this.state.attendees}
					 />
				</div>
			</div>
		);
	}
}