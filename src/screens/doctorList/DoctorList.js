import React, { useEffect, useState } from 'react';
import { getDoctors, getSpecialties } from '../../util/fetch';
import { Star, StarBorder } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SPECIALTIES } from '../../store/actions';

const DoctorList = () => {
	const [doctors, setDoctors] = useState([]);
	const specialties = useSelector((state) => state.doctorReducer.allSpecialties);
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

	return (
		<div>
			<h1 className='text-center'>Doctor List</h1>
			<div className='row'>
				{doctors.length > 0 &&
					doctors.map((doctor) => (
						<div key={doctor.id} className='col-12 my-2'>
							<div className='card'>
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
										({doctor.rating})
									</p>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default DoctorList;
