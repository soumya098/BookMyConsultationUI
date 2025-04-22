import * as actionTypes from '../actions';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	dob: '',
	loggedIn: false
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				...state,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				email: action.payload.emailAddress,
				phone: action.payload.mobilePhoneNumber,
				loggedIn: true
			};
		case actionTypes.LOGOUT:
			return {
				...initialState
			};
		default:
			return state;
	}
};

export default userReducer;
