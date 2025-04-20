import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/logo.jpeg';
import { Button } from '@material-ui/core';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Header = () => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const loggedIn = useSelector((state) => state.userReducer.loggedIn);
	const dispatch = useDispatch();


	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<div className='header'>
			<div className='header-title'>
				<img src={logo} alt='logo' className='logo' />
				<span className='title'>Doctor Finder</span>
			</div>
			{loggedIn ? (
				<Button variant='contained' color='secondary' onClick={() => dispatch({ type: 'LOGOUT' })}>
					LOGOUT
				</Button>
			) : (
				<Button variant='contained' color='primary' onClick={openModal}>
					LOGIN
				</Button>
			)}

			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='Example Modal'>
				<button onClick={closeModal}>close</button>
				<div>I am a modal</div>
				
			</Modal>
		</div>
	);
};

export default Header;
