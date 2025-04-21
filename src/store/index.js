import { persistedReducer } from './reducer';
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from '@redux-devtools/extension';

export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);

export default store;
