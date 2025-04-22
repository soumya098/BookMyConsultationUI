import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import ReactModal from 'react-modal';

const Modal = ({ isOpen, closeModal, classNames, title, children, contentClassNames = 'modal-body' }) => {
	return (
		<ReactModal isOpen={isOpen} onRequestClose={closeModal} contentLabel='Example Modal' className={classNames}>
			<Card variant='outlined' className='modal-card'>
				<CardContent className='modal-header'>
					<span className='text-white'>{title}</span>
				</CardContent>
				<CardContent className={contentClassNames}>{children}</CardContent>
			</Card>
		</ReactModal>
	);
};

export default Modal;
