import axios from 'axios'

const USERS_URL = '/api/users'
const AUTH_URL = '/api/auth'

// Register user
const register = async (userData) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	const response = await axios.post(USERS_URL, userData, config)

	if (response.data) {
		localStorage.setItem('user', response.data.token)
	}

	setAuthToken(response.data)
	return loadUser()
}

// Login user
const login = async (userData) => {
	const response = await axios.post(AUTH_URL, userData)
	if (response.data) {
		localStorage.setItem('user', response.data.token)
	}

	setAuthToken(response.data.token)

	return loadUser()
}

const loadUser = async () => {
	let token = null
	if (localStorage.user) {
		token = localStorage.getItem('user')
	}

	setAuthToken(token)

	try {
		const response = await axios.get(AUTH_URL)

		return response.data
	} catch (error) {
		console.log('Error:  ', error)
	}
}

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token
	} else {
		delete axios.defaults.headers.common['x-auth-token']
	}
}

// Logout user
const logout = () => {
	localStorage.removeItem('user')
	setAuthToken()
}

const authService = {
	register,
	login,
	logout,
	loadUser,
}

export default authService
