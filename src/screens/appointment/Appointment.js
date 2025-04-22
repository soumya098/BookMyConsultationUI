import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserAppointments, submitRating } from '../../util/fetch';
import { Box, Button, Card, CardContent, FormHelperText, Paper, TextField, Typography } from '@material-ui/core';
import ReactModal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';
import { Rating } from '@material-ui/lab';

const displayAppointments = (appointments, handleModalToggle) => {
	if (appointments.length === 0) {
		return <div className='col-12 text-center fs-5'>No Appointments</div>;
	}
	return (
		<div className='col-12 mt-3'>
			{appointments.map((appointment) => (
				<Paper key={appointment.appointmentId} className='appointment-card gap-3' elevation={3}>
					<Box >
						<Typography variant='body1'>Dr: { appointment?.doctorName}</Typography>
						<Typography variant='body2'>Date: { appointment?.appointmentDate}</Typography>
						<Typography variant='body2'>Symptoms: { appointment?.symptoms}</Typography>
						<Typography variant='body2'>PriorMedicalHistory: { appointment?.priorMedicalHistory}</Typography>
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
		setIsOpen(!isOpen);
		setAppointment(appointment);
	};

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data);
		await submitRating(data);
		setIsOpen(false);
		fetchAppointments();
	};

	return (
		<>
			<div className='col-12'>{isLoggedIn ? displayAppointments(appointments, handleModalToggle) : <div className='text-center fs-5'>Login to see appointments</div>}</div>
			<ReactModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className='custom-modal' contentLabel='Rate Appointment'>
				<Card variant='outlined' className='modal-card'>
					<CardContent className='modal-header'>
						<span className='text-white'>Rate an Appointment</span>
					</CardContent>
					<CardContent className='rating-modal-body'>
						<form className='appointment-modal-form mt-3' onSubmit={handleSubmit(onSubmit)}>
							<TextField fullWidth label='Comments' multiline minRows={4} {...register('comments')} margin='normal' />

							<div className='mt-3 d-flex flex-row align-items-center'>
								<Typography variant='body1' sx={{ mt: 2 }} className='me-2'>
									Rating:
								</Typography>
								<Controller
									name='rating'
									control={control}
									rules={{ required: 'Select a rating' }}
									render={({ field }) => <Rating {...field} size='medium' value={Number(field.value) || 0} onChange={(_, value) => field.onChange(value)} />}
								/>
							</div>
							{errors.rating && <FormHelperText error>{errors.rating.message}</FormHelperText>}

							<input type='hidden' {...register('appointmentId')} value={appointment?.appointmentId} />
							<input type='hidden' {...register('doctorId')} value={appointment?.doctorId} />

							<Button variant='contained' color='primary' className='mt-4' type='submit'>
								Rate Appointment
							</Button>
						</form>
					</CardContent>
				</Card>
			</ReactModal>
		</>
	);
};

export default Appointment;
