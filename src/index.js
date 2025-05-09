import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Controller from './screens/Controller';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastProvider } from './common/Notification';

const App = () => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ToastProvider>
				<Controller />
			</ToastProvider>
		</PersistGate>
	</Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
