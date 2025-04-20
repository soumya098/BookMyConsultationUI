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
				email: action.payload.email,
				loggedIn: true
			};
		case actionTypes.LOGOUT:
			return {
				...state,
				email: '',
				loggedIn: false
			};
		default:
			return state;
	}
};

export default userReducer;
