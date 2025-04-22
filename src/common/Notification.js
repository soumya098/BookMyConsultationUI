import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let showToast;

const ToastProvider = ({ children }) => {
	useEffect(() => {
		showToast = (message, type = 'default') => {
			toast[message && type] ? toast[type](message) : toast(message);
		};
		return () => {
			showToast = null;
		};
	}, []);

	return (
		<>
			{children}
			<ToastContainer autoClose={1000} position='bottom-right' />
		</>
	);
};

export { ToastProvider, showToast };
