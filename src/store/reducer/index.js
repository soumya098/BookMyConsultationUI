import userReducer from './userReducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import doctorReducer from './doctorReducer';

const persistConfig = {
	key: 'root',
	storage // storage: AsyncStorage for react-native
	//whitelist: ['userReducer'] // only userReducer will be persisted
	// blacklist: ['otherReducer'], // otherReducer will not be persisted
	//  timeout: 0, // disable timeout
	//  version: 1, // version of the persisted data
	//  debug: true, // enable debug mode
};

export const rootReducer = combineReducers({
	userReducer,
	doctorReducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
