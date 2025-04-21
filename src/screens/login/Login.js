import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../store/actions/authActionCreators';
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';


const Login = ({ onLoginSuccess }) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data);
		await loginUser(data);
		onLoginSuccess();
	};
	return (
		<form className='modal-form mt-3' onSubmit={handleSubmit(onSubmit)}>
			<FormControl fullWidth error={!!errors.email}>
				<InputLabel htmlFor='login-email'>Email*</InputLabel>
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

			<Button variant='contained' color='primary' type='submit'>
				Login
			</Button>
		</form>
	);
};

export default Login;
