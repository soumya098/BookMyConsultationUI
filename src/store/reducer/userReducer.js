import * as actionTypes from '../actions';

const initialState = {
	firstname: '',
	lastname: '',
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
				firstname: action.payload.firstName,
				lastname: action.payload.lastName,
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
