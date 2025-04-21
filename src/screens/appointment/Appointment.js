import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserAppointments } from '../../util/fetch';

const displayAppointments = (appointments) => {
	if (appointments.length === 0) {
		return <div className='col-12 text-center fs-5'>No Appointments</div>;
	}
	return appointments.map((appointment) => (
		<div key={appointment.appointmentId} className='col-12 text-center fs-5'>
			{appointment.appointmentDate} - {appointment.timeSlot} with {appointment.doctorName}
		</div>
	));
};

const Appointment = () => {
	const user = useSelector((state) => state.userReducer);
	const isLoggedIn = user.loggedIn;
	const userId = user.email;
	const [appointments, setAppointments] = useState([]);

	const fetchAppointments = async () => {
		try {
			const response = await getUserAppointments(userId);
			console.log('Appointments:', response);
			setAppointments(response);
		} catch (error) {
			console.error('Error fetching appointments:', error);
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			fetchAppointments();
		}
	}, [isLoggedIn]);

	return <div className='col-12 text-center fs-5'>{isLoggedIn ? displayAppointments(appointments) : 'Login to see appointments'}</div>;
};

export default Appointment;
