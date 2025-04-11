import axios from 'axios'

const USERS_URL = '/api/users'
const AUTH_URL = '/api/auth'

// Register user
const register = async (userData) => {
	const response = await axios.post(USERS_URL, userData)

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}

// Login user
const login = async (userData) => {
	const response = await axios.post(AUTH_URL, userData)

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}

// Logout user
const logout = () => localStorage.removeItem('user')

const authService = {
	register,
	login,
	logout,
}

export default authService
