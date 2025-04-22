import * as actionTypes from './';
import * as api from '../../util/fetch';
import store from '../index';
import { showToast } from '../../common/Notification';

export const loginUser = async (data) => {
	try {
		const response = await api.login(data.email, data.password);
		console.log('Login successful:', response);
		sessionStorage.setItem('token', response.accessToken);
		store.dispatch({ type: actionTypes.SET_USER, payload: response });
		showToast('Login successful', 'success');
	} catch (error) {
		console.error('Login failed:', error);
		showToast(error.details.message, 'error');
	}
};

export const logoutUser = async () => {
	try {
		await api.logout();
		console.log('Logout successful');
		sessionStorage.removeItem('token');
		store.dispatch({ type: actionTypes.LOGOUT });
		showToast('Logout successful', 'success');
	} catch (error) {
		console.error('Logout failed:', error);
		// Handle error (e.g., show a notification)
	}
};

export const registerUser = async (data) => {
	try {
		const res = await api.register(data);

		// Handle successful registration (e.g., show a notification or redirect)
		console.log('Registration successful:', res);

		const response = await loginUser({
			email: data.email,
			password: data.password
		});

		console.log('Login successful:', response);
	} catch (error) {
		console.error('Registration failed:', error);
		// Handle error (e.g., show a notification)
	}
};
