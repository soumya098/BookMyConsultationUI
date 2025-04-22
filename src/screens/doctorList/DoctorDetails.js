import { Card, CardContent, Typography } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const DoctorDetails = ({ isOpen, onClose, title, doctor }) => {
	return (
		<ReactModal isOpen={isOpen} onRequestClose={onClose} className='doctor-modal' contentLabel={title || 'Modal'}>
			<Card variant='outlined' className='modal-card'>
				<CardContent className='modal-header'>
					<span className='text-white'>{title}</span>
				</CardContent>
				<CardContent className='doctor-details-modal-body'>
					<div className='doctor-details'>
						<Typography variant='body1'>
							Dr: {doctor?.firstName} {doctor?.lastName}
						</Typography>
						<Typography variant='body2'>Total Experience: {doctor?.totalYearsOfExp} years</Typography>
						<Typography variant='body2'>Speciality: {doctor?.speciality}</Typography>
						<Typography variant='body2'>Date of Birth: {doctor?.dob}</Typography>
						<Typography variant='body2'>City: {doctor?.address?.city}</Typography>
						<Typography variant='body2'>Email: {doctor?.emailId}</Typography>
						<Typography variant='body2'>mobile: {doctor?.mobile}</Typography>
						<Typography variant='body2'>
							Rating:{' '}
							{Array.from({ length: 5 }, (_, i) =>
								i < Math.floor(doctor?.rating) ? <Star key={i} style={{ color: '#fbc02d' }} /> : <StarBorder key={i} style={{ color: '#fbc02d' }} />
							)}
						</Typography>
					</div>
				</CardContent>
			</Card>
		</ReactModal>
	);
};

export default DoctorDetails;
