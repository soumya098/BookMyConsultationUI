import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/logo.jpeg';
import { Box, Button, Card, CardContent, Tab, Tabs } from '@material-ui/core';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../store/actions/authActionCreators';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';

ReactModal.setAppElement('#root');

const Header = () => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [tabValue, setTabValue] = useState(0);
	const loggedIn = useSelector((state) => state.userReducer.loggedIn);

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
							{tabValue === 0 ? <Login onLoginSuccess={closeModal} /> : <Register onLoginSuccess={closeModal} />}
						</Box>
					</CardContent>
				</Card>
			</ReactModal>
		</div>
	);
};

export default Header;
