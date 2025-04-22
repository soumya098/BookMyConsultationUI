import React, { useEffect, useState } from 'react';
import { getDoctorBySpecialty, getDoctors, getSpecialties } from '../../util/fetch';
import { Star, StarBorder } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SPECIALTIES } from '../../store/actions';
import { Button, Paper } from '@material-ui/core';
import BookAppointment from './BookAppointment';
import DoctorDetails from './DoctorDetails';

const DoctorList = () => {
	const [doctors, setDoctors] = useState([]);
	const specialties = useSelector((state) => state.doctorReducer.allSpecialties);
	console.log('redux specialties:', specialties);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [modalNo, setModalNo] = useState(0);

	const dispatch = useDispatch();

	const fetchDoctors = async () => {
		try {
			const response = await getDoctors();
			setDoctors(response);
		} catch (error) {
			console.error('Error fetching doctors:', error);
		} finally {
		}
	};

	const fetchSpecialties = async () => {
		try {
			const response = await getSpecialties();
			console.log('Specialties:', response);
			dispatch({ type: SET_SPECIALTIES, payload: response });
		} catch (error) {
			console.error('Error fetching specialties:', error);
		}
	};

	useEffect(() => {
		fetchDoctors();
		if (specialties.length === 0) {
			fetchSpecialties();
		}
	}, []);

	const handleChange = async (e) => {
		const selectedSpecialty = e.target.value;
		if (selectedSpecialty) {
			try {
				const response = await getDoctorBySpecialty(selectedSpecialty);
				setDoctors(response);
			} catch (error) {
				console.error('Error fetching doctors by specialty:', error);
			}
		} else {
			fetchDoctors();
		}
	};

	const handleBooking = (doctor) => {
		setModalNo(1)
		setIsOpen(true);
		setSelectedDoctor(doctor);
	};

	const handleViewDetails = (doctor) => {
		setModalNo(0);
		setIsOpen(true);
		setSelectedDoctor(doctor);
	};

	return (
		<div>
			<div className='d-flex justify-content-center my-3'>
				<select className='form-select w-50' aria-label='Default select example' onChange={handleChange}>
					<option value=''>Select Speciality</option>
					{specialties.length > 0 &&
						specialties.map((specialty) => (
							<option key={specialty} value={specialty}>
								{specialty}
							</option>
						))}
				</select>
			</div>

			<div className='row justify-content-center'>
				{doctors.length > 0 &&
					doctors.map((doctor) => (
						<div key={doctor.id} className='col-12 my-2'>
							<Paper elevation={3} className='card'>
								<div className='card-body'>
									<h5 className='card-title'>
										Doctor Name: {doctor.firstName} {doctor.lastName}
									</h5>
									<p className='card-text'>Speciality: {doctor.speciality}</p>
									<p className='card-text'>
										Rating:{' '}
										{Array.from({ length: 5 }, (_, i) =>
											i < Math.floor(doctor.rating) ? <Star key={i} style={{ color: '#fbc02d' }} /> : <StarBorder key={i} style={{ color: '#fbc02d' }} />
										)}
									</p>

									<div className='d-flex justify-content-between align-items-center gap-4'>
										<Button variant='contained' color='primary' fullWidth onClick={() => handleBooking(doctor)}>
											Book Appointment
										</Button>
										<Button variant='contained' fullWidth className='details-btn' onClick={() => handleViewDetails(doctor)}>
											View Details
										</Button>
									</div>
								</div>
							</Paper>
						</div>
					))}
			</div>

			<BookAppointment isOpen={modalNo === 1 && isOpen} onClose={() => setIsOpen(false)} title='Book an Appointment' doctor={selectedDoctor} />
			<DoctorDetails isOpen={modalNo === 0 && isOpen} onClose={() => setIsOpen(false)} title='Doctor Details' doctor={selectedDoctor} />
		</div>
	);
};

export default DoctorList;
