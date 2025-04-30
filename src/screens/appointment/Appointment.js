import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserAppointments, submitRating } from '../../util/fetch';
import { Box, Button, Card, CardContent, FormHelperText, Paper, TextField, Typography } from '@material-ui/core';
import ReactModal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';
import { Rating } from '@material-ui/lab';
import RateAppointment from './RateAppointment';
import { is } from 'date-fns/locale';
import { toastService } from '../../services/toastService';

const displayAppointments = (appointments, handleModalToggle) => {
	if (appointments.length === 0) {
		return <div className='col-12 text-center fs-5'>No Appointments</div>;
	}
	return (
		<div className='col-12 mt-3'>
			{appointments.map((appointment) => (
				<Paper key={appointment.appointmentId} className='appointment-card gap-3' elevation={3}>
					<Box>
						<Typography variant='body1'>Dr: {appointment?.doctorName}</Typography>
						<Typography variant='body2'>Date: {appointment?.appointmentDate}</Typography>
						<Typography variant='body2'>Symptoms: {appointment?.symptoms}</Typography>
						<Typography variant='body2'>PriorMedicalHistory: {appointment?.priorMedicalHistory}</Typography>
					</Box>
					<Button variant='contained' color='primary' style={{ width: 'fit-content' }} onClick={() => handleModalToggle(appointment)}>
						Rate Appointment
					</Button>
				</Paper>
			))}
		</div>
	);
};

const Appointment = () => {
	const user = useSelector((state) => state.userReducer);
	const isLoggedIn = user.loggedIn;
	const userId = user.email;
	const [appointments, setAppointments] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [appointment, setAppointment] = useState({});
	console.log(appointment);

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

	const handleModalToggle = (appointment) => {
		setAppointment(appointment);
		setIsOpen(!isOpen);
	};

	const onSubmit = async (data) => {
		console.log(data);
		try {
			await submitRating(data);
			toastService.show('Rating submitted successfully', 'success');
		} catch (error) {
			console.log(error);
		}
		setIsOpen(false);
		fetchAppointments();
	};

	return (
		<>
			<div className='col-12'>{isLoggedIn ? displayAppointments(appointments, handleModalToggle) : <div className='text-center fs-5'>Login to see appointments</div>}</div>
			<RateAppointment appointment={appointment} onSubmit={onSubmit} setIsOpen={setIsOpen} isOpen={isOpen}></RateAppointment>
		</>
	);
};

export default Appointment;
