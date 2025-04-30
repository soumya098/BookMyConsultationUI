import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { toastService } from './toastService';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = ({ children }) => {
	useEffect(() => {
		toastService.register((message, type, options) => {
			const fn = toast[type] || toast;
			fn(message, options);
		});
	}, []);
	return (
		<>
			{children}
			<ToastContainer
				autoClose={3000}
				draggable
				pauseOnHover
				closeOnClick
				position='bottom-right'
				style={{ width: 'auto', maxWidth: '100%' }}
				toastStyle={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
			/>
		</>
	);
};

export default ToastProvider;
