import * as actionTypes from '../actions';

const initialState = {
	doctors: [],
	allSpecialties: [],
	specialty: '',
	loading: false,
	error: null
};

const doctorReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_SPECIALTIES:
			return {
				...state,
				allSpecialties: action.payload
			};
		default:
			return state;
	}
};

export default doctorReducer;
