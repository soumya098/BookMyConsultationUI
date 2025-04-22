let toastFunction = () => {};

export const toastService = {
	register: (fn) => {
		toastFunction = fn;
	},

	show: (message, type = 'default', options = {}) => {
		if (toastFunction) {
			toastFunction(message, type, options);
		} else {
			console.warn('Toast function is not registered');
		}
	}
};
