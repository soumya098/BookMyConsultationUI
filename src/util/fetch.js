const baseURL = 'http://localhost:8081';

const loginUrl = `${baseURL}/auth/login`;
const logoutUrl = `${baseURL}/auth/logout`;
const registerUrl = `${baseURL}/users/register`;

export const login = async (email, password) => {
	const credentials = btoa(`${email}:${password}`); // Encode to Base64
	const response = await fetch(loginUrl, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${credentials}`
		}
	});
	if (!response.ok) {
		throw new Error('Login failed');
	}
	return response.json();
};

export const logout = async () => {
	await fetch(logoutUrl, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem('token')}`
		}
	});
};

export const register = async ({ fname, lname, email, password, mobile }) => {
	const response = await fetch(registerUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ firstName: fname, lastName: lname, email, password, mobile })
	});
	if (!response.ok) {
		throw new Error('Registration failed');
	}
	return response.json();
};
