import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Card, CardContent, FormHelperText, TextField, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Modal from '../../common/Modal';

const RateAppointment = ({ appointment, onSubmit, isOpen, setIsOpen }) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm();

	return (
		<Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} classNames='custom-modal' title='Rate an Appointment' contentClassNames='rating-modal-body'>
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
		</Modal>
	);
};

export default RateAppointment;
