import React, { Component } from 'react';
import api from '../core/api';

const CheckInButton = ({id, enabled, onClick}) => {
	return (
		<button onClick={() => onClick(id, enabled)} className="button">
			{`Check ${enabled && 'Out' || 'In'}`}
  	</button>
	);
};

const AttendeesTable = ({attendees, checkin}) => {
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
			  			const {id, first_name, last_name, email, school_name, rsvp, checked_in} = attendee;
			  			const highlight = checked_in && {background: '#AED581', color: 'white'} || {};
			  			return (
			  				<tr key={i} style={highlight}>
									<td>{first_name}</td>
									<td>{last_name}</td>
									<td>{email}</td>
									<td>{school_name}</td>
									<td>{rsvp ? "yes": "no"}</td>
									<td>
										<CheckInButton id={id} enabled={checked_in} onClick={checkin}/>
					      	</td>
						    </tr>
			  			)
			  		})}
				</tbody>
			</table>
		</div>
	);
};


export default AttendeesTable;
