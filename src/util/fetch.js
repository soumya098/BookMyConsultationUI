const baseURL = 'http://localhost:8081';

const loginUrl = `${baseURL}/auth/login`;
const logoutUrl = `${baseURL}/auth/logout`;
const registerUrl = `${baseURL}/users/register`;

const doctorsUrl = `${baseURL}/doctors`;
const specialitiesUrl = `${baseURL}/doctors/speciality`;

const appointmentsUrl = `${baseURL}/users`;
const bookAppointmentUrl = `${baseURL}/appointments`;
const ratingUrl = `${baseURL}/ratings	`;

const createHeaders = (includeToken = false, credentials = null) => {
	const headers = {
		'Content-Type': 'application/json'
	};

	if (includeToken) {
		const token = sessionStorage.getItem('token');
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}
	} else if (credentials) {
		headers.Authorization = `Basic ${credentials}`;
	}

	return headers;
};

export const login = async (email, password) => {
	const credentials = btoa(`${email}:${password}`);
	const response = await fetch(loginUrl, {
		method: 'POST',
		headers: createHeaders(false, credentials)
	});

	const result = await response.json();

	if (!response.ok) {
		const error = new Error(result.message || 'Login failed');
		error.status = response.status;
		error.details = result;
		throw error;
	}

	return result;
};

export const logout = async () => {
	await fetch(logoutUrl, {
		method: 'POST',
		headers: createHeaders(true)
	});
};

export const register = async ({ fname, lname, email, password, mobile }) => {
	const response = await fetch(registerUrl, {
		method: 'POST',
		headers: createHeaders(),
		body: JSON.stringify({ firstName: fname, lastName: lname, emailId: email, password, mobile })
	});
	if (!response.ok) {
		throw new Error('Registration failed');
	}
	return response.json();
};

export const getDoctors = async () => {
	const response = await fetch(doctorsUrl, {
		method: 'GET'
	});
	if (!response.ok) {
		throw new Error('Failed to fetch doctors');
	}
	return response.json();
};

export const getSpecialties = async () => {
	const response = await fetch(specialitiesUrl, {
		method: 'GET'
	});
	if (!response.ok) {
		throw new Error('Failed to fetch specialities');
	}
	return response.json();
};

export const getDoctorById = async (id) => {
	const response = await fetch(`${doctorsUrl}/${id}`, {
		method: 'GET'
	});
	if (!response.ok) {
		throw new Error('Failed to fetch doctor details');
	}
	return response.json();
};

export const getDoctorBySpecialty = async (speciality) => {
	const response = await fetch(`${doctorsUrl}?speciality=${speciality}`, {
		method: 'GET'
	});
	if (!response.ok) {
		throw new Error('Failed to fetch doctors by speciality');
	}
	return response.json();
};

export const getUserAppointments = async (userId) => {
	const response = await fetch(`${appointmentsUrl}/${userId}/appointments`, {
		method: 'GET',
		headers: createHeaders(true)
	});
	if (!response.ok) {
		throw new Error('Failed to fetch user appointments');
	}
	return response.json();
};

export const bookAppointment = async (data) => {
	const response = await fetch(bookAppointmentUrl, {
		method: 'POST',
		headers: createHeaders(true),
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		throw new Error('Failed to book appointment');
	}

	return response.text();
};

export const submitRating = async (data) => {
	const response = await fetch(ratingUrl, {
		method: 'POST',
		headers: createHeaders(true),
		body: JSON.stringify(data)
	});

	console.log('Response:', response);

	if (!response.ok) {
		throw new Error('Failed to submit rating');
	}
	return response;
};
