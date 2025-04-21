import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../store/actions/authActionCreators';
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';

const Register = ({ onLoginSuccess }) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const onSubmit = (data) => {
		console.log(data);
		registerUser(data);
		onLoginSuccess();
	};

	return (
		<form className='modal-form mt-3' onSubmit={handleSubmit(onSubmit)}>
			<FormControl fullWidth error={!!errors.fname}>
				<InputLabel htmlFor='register-fname'>First Name*</InputLabel>
				<Input
					id='register-fname'
					type='text'
					{...register('fname', {
						required: 'First Name is required'
					})}
				/>
				<FormHelperText>{errors.fname?.message}</FormHelperText>
			</FormControl>

			<FormControl fullWidth error={!!errors.lname}>
				<InputLabel htmlFor='register-lname'>Last Name*</InputLabel>
				<Input
					id='register-lname'
					type='text'
					{...register('lname', {
						required: 'Last Name is required'
					})}
				/>
				<FormHelperText>{errors.lname?.message}</FormHelperText>
			</FormControl>

			<FormControl fullWidth error={!!errors.email}>
				<InputLabel htmlFor='login-email'>Email Id*</InputLabel>
				<Input
					id='login-email'
					type='email'
					{...register('email', {
						required: 'Email is required',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Enter valid Email'
						}
					})}
				/>
				<FormHelperText>{errors.email?.message}</FormHelperText>
			</FormControl>

			<FormControl fullWidth error={!!errors.password}>
				<InputLabel htmlFor='login-password'>Password*</InputLabel>
				<Input id='login-password' type='password' {...register('password', { required: 'Password is required' })} />
				<FormHelperText>{errors.password?.message}</FormHelperText>
			</FormControl>

			<FormControl fullWidth error={!!errors.mobile}>
				<InputLabel htmlFor='register-mobile'>Mobile no*</InputLabel>
				<Input
					id='register-mobile'
					type='number'
					{...register('mobile', {
						required: 'Mobile no is required'
					})}
				/>
				<FormHelperText>{errors.mobile?.message}</FormHelperText>
			</FormControl>

			<Button variant='contained' color='primary' type='submit'>
				Register
			</Button>
		</form>
	);
};

export default Register;
