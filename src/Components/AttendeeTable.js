import React, { Component } from 'react';
import Auth from '../core/auth';
import axios from 'axios';

export default class AttendeesTable extends Component {
	constructor(props) {
		super(props);

		this.onCheckin = this.onCheckin.bind(this);
	}

	componentDidMount() {
		
	}

	onCheckin(attendee) {
		console.log(attendee);
	}

	render() {
		const {attendees} = this.props;

		return (
			<div>
				<table className="table">
				  	<thead>
				    	<tr>
					      <th>First Name</th>
					      <th>Last Name</th>
					      <th>Email</th>
					      <th>School</th>
					      <th><abbr title="RSVPd">RSVPd</abbr></th>
					      <th>Check In</th>
					    </tr>
				  	</thead>
				  	<tbody>
				  		{ attendees && attendees.map((attendee, i) => {
				  			return (
				  				<tr key={i}>
									<td>{attendee.first_name}</td>
									<td>{attendee.last_name}</td>
									<td>{attendee.email}</td>
									<td>{attendee.school_name}</td>
									<td>{attendee.rsvp ? "yes": "no"}</td>
									<td>
								      	<button onClick={() => this.onCheckin(attendee)} className="button">
								      		{attendee.checked_in ? "Check In" : "Check Out"}
							      		</button>
					      			</td>
							    </tr>
				  			)
				  		})}
					</tbody>
				</table>
			</div>
		);
	}
}

class CheckInButton extends Component {
	render() {
		const {attendee} = this.props;
		return (
			<button onClick={() => this.onCheckin(attendee)} className="button">
	      		{attendee.checked_in ? "Check In" : "Check Out"}
	  		</button>
  		);
	}
}