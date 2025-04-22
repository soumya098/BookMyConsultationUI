import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { toastService } from './toastService';

const ToastProvider = ({children}) => {
	useEffect(() => {
		toastService.register((message, type, options) => {
			const fn = toast[type] || toast;
			fn(message, options);
		});
	}, []);
	return (
    <>
      {children}
			<ToastContainer autoClose={2000} draggable pauseOnHover closeOnClick position='bottom-right' />;
		</>
	);
};

export default ToastProvider;
