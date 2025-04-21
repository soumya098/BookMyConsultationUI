import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/logo.jpeg';
import { Box, Button, Card, CardContent, FormControl, Input, InputLabel, Tab, Tabs, FormHelperText } from '@material-ui/core';
import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser, logoutUser, registerUser } from '../../store/actions/authActionCreators';

const LoginForm = ({ onLoginSuccess }) => {
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

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const onSubmit = (data) => {
		console.log(data);
		registerUser(data);
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

const Header = () => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [tabValue, setTabValue] = useState(0);
	const loggedIn = useSelector((state) => state.userReducer.loggedIn);
	const dispatch = useDispatch();

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const handleTabChange = (e, newValue) => {
		setTabValue(newValue);
	};

	const handleLogOut = async () => {
		await logoutUser();
	};

	return (
		<div className='header'>
			<div className='header-title'>
				<img src={logo} alt='logo' className='logo' />
				<span className='title'>Doctor Finder</span>
			</div>
			{loggedIn ? (
				<Button variant='contained' color='secondary' onClick={handleLogOut}>
					LOGOUT
				</Button>
			) : (
				<Button variant='contained' color='primary' onClick={openModal}>
					LOGIN
				</Button>
			)}

			<ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='Example Modal' className='login-modal'>
				<Card variant='outlined' className='modal-card'>
					<CardContent className='modal-header'>
						<span className='text-white'>Authentication</span>
					</CardContent>
					<CardContent className='modal-body'>
						<Tabs value={tabValue} onChange={handleTabChange} aria-label='simple tabs example' centered>
							<Tab label='Login' />
							<Tab label='Register' />
						</Tabs>
						<Box width={1} display='flex' justifyContent='center' alignItems='center' className='modal-content' alignSelf='center'>
							{tabValue === 0 ? <LoginForm onLoginSuccess={closeModal} /> : <RegisterForm />} {/* Replace with RegisterForm component */}
						</Box>
					</CardContent>
				</Card>
			</ReactModal>
		</div>
	);
};

export default Header;
