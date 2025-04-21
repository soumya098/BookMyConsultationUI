import { Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import DoctorList from '../doctorList/DoctorList';

const Home = ({ baseUrl }) => {
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

	return (
		<div className='d-flex flex-column align-items-center justify-content-center'>
			<div className='w-100 d-flex justify-content-center'>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='simple tabs example'
					className='w-100 d-flex justify-content-center'
					variant='fullWidth'
					indicatorColor='primary'
					textColor='primary'>
					<Tab label='Doctor' />
					<Tab label='Appointment' />
				</Tabs>
			</div>

			<div className='row w-100 mt-5 d-flex justify-content-center'>
				{value === 0 ? (
					<div className='col-8'>
						<DoctorList />
					</div>
				) : (
					<div className='col-12 text-center fs-5'>{isLoggedIn ? 'Appointments' : 'Login to see appointments'}</div>
				)}
			</div>
		</div>
	);
};

export default Home;
