import { Button, Card, CardContent, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { useSelector } from 'react-redux';
import { bookAppointment } from '../../util/fetch';
import { ca } from 'date-fns/locale';

ReactModal.setAppElement('#root');

const timeSlots = [
	'08AM-09AM',
	'09AM-10AM',
	'10AM-11AM',
	'11AM-12PM',
	'12PM-01PM',
	'01PM-02PM',
	'02PM-03PM',
	'03PM-04PM',
	'04PM-05PM',
	'05PM-06PM',
	'06PM-07PM',
	'07PM-08PM',
	'08PM-09PM'
];

const BookAppointment = ({ isOpen, onClose, title, doctor }) => {
	console.log('Doctor:', doctor);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const { firstName, lastName, email } = useSelector((state) => state.userReducer);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const onSubmit = async (data) => {
		data.appointmentDate = selectedDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD

		console.log('Form Data:', data);
		try {
			const response = await bookAppointment(data);
			console.log('Response:', response);
		} catch (error) {
			console.error('Error booking appointment:', error);
			alert('Either the slot is already booked or not available.');
			onClose();
		}
	};

	return (
		<ReactModal isOpen={isOpen} onRequestClose={onClose} className='custom-modal' contentLabel={title || 'Modal'}>
			<Card variant='outlined' className='modal-card'>
				<CardContent className='modal-header'>
					<span className='text-white'>{title}</span>
				</CardContent>
				<CardContent className='modal-body'>
					<form className='appointment-modal-form mt-3' onSubmit={handleSubmit(onSubmit)}>
						<FormControl error={!!errors.doctorName}>
							<InputLabel htmlFor='login-email'>Doctor Name*</InputLabel>
							<Input type='text' {...register('doctorName')} value={`${doctor?.firstName} ${doctor?.lastName}`} disabled />
							<FormHelperText>{errors.doctorName?.message}</FormHelperText>
						</FormControl>

						<input type='hidden' {...register('doctorName')} value={`${doctor?.firstName} ${doctor?.lastName}`} />
						<input type='hidden' {...register('doctorId')} value={doctor?.id} />
						<input type='hidden' {...register('userId')} value={email} />
						<input type='hidden' {...register('userName')} value={`${firstName} ${lastName}`} />
						<input type='hidden' {...register('userEmailId')} value={email} />

						<div>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									disableToolbar
									variant='inline'
									format='MM/dd/yyyy'
									margin='normal'
									id='date-picker-inline'
									label='Date picker inline'
									value={selectedDate}
									onChange={handleDateChange}
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
								/>
							</MuiPickersUtilsProvider>
						</div>

						<FormControl error={!!errors.timeSlot} className='w-50'>
							<InputLabel>Timeslot</InputLabel>
							<Select label='Timeslot' defaultValue='' {...register('timeSlot', { required: 'Select a time slot' })}>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								{timeSlots.map((slot) => (
									<MenuItem key={slot} value={slot}>
										{slot}
									</MenuItem>
								))}
							</Select>
							<FormHelperText>{errors.timeSlot?.message}</FormHelperText>
						</FormControl>

						<div>
							<TextField label='Medical History' margin='normal' multiline {...register('priorMedicalHistory')} className='w-50' minRows={5} />
							<br />

							<TextField label='Symptoms' margin='normal' multiline {...register('symptoms')} className='w-50' minRows={5} />
						</div>

						<div className='mt-5'>
							<Button variant='contained' color='primary' type='submit'>
								Book Appointment
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</ReactModal>
	);
};

export default BookAppointment;
