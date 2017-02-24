import React, { Component } from 'react';
import api from '../core/api';

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
		api.get('attendees')
			.then( res => this.setState((prevState, props) => ({attendees: res.data})))
			.catch(err => console.log(err));
	}

	checkinAttendee(id, status){
		api.post(`attendees/${id}`, {checked_in: !status})
			.then(data => this.fetchAttendees());
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
						checkin={this.checkinAttendee.bind(this)}
					 />
				</div>
			</div>
		);
	}
}