import axios from 'axios'
import { toast } from 'react-toastify'

// Get current user's profile
const getCurrentProfile = async () => {
	try {
		const response = await axios.get('/api/profile/me')

		return response.data
	} catch (error) {
		console.log('Error:  ', error)
		return {
			msg: error.response.statusText,
			status: error.response.status,
		}
	}
}

// Get all profiles
const getProfiles = async () => {
	try {
		const response = await axios.get('/api/profile')
		return response.data
	} catch (error) {
		console.log('Error:  ', error)
		return {
			msg: error.response.statusText,
			status: error.response.status,
		}
	}
}

// Get profile by Id
const getProfileById = async (userId) => {
	try {
		const response = await axios.get(`/api/profile/user/${userId}`)

		return response.data
	} catch (error) {
		console.log('Error:  ', error)
		return {
			msg: error.response.statusText,
			status: error.response.status,
		}
	}
}

// Get Github repos
const getGithubRepos = async (username) => {
	try {
		const response = await axios.get(`/api/profile/github/${username}`)

		return response.data
	} catch (error) {
		console.log('Github Error:  ', error)
		return {
			msg: error.response.statusText,
			status: error.response.status,
		}
	}
}

// Create or update profile
const createProfile = async (formData) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const response = await axios.post('/api/profile', formData, config)

		return response.data
	} catch (error) {
		const errors = error.response.data.errors
		if (errors) {
			errors.forEach((error) => toast.error(error.msg))
		}
		return {
			msg: error.response.statusText,
			status: error.response.status,
		}
	}
}

// Add an Experience
const addExperience = async (formData) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const response = await axios.put('/api/profile/experience', formData, config)

		return response.data
	} catch (error) {
		const errors = error.response.data.errors
		if (errors) {
			errors.forEach((error) => toast.error(error.msg))
		} else {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.errors &&
					error.response.data.errors[0].msg) ||
				error.message ||
				error.toString()
			toast.error(message)
		}
	}
}

// Add an Education
const addEducation = async (formData) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const response = await axios.put('/api/profile/education', formData, config)

		return response.data
	} catch (error) {
		const errors = error.response.data.errors
		if (errors) {
			errors.forEach((error) => toast.error(error.msg))
		} else {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.errors &&
					error.response.data.errors[0].msg) ||
				error.message ||
				error.toString()
			toast.error(message)
		}
	}
}

// Delete an Experience
const deleteExperience = async (id) => {
	try {
		const response = await axios.delete(`/api/profile/experience/${id}`)

		toast.success('Experience has been deleted')

		return response.data
	} catch (error) {
		const errors = error.response.data.errors
		if (errors) {
			errors.forEach((error) => toast.error(error.msg))
		} else {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.errors &&
					error.response.data.errors[0].msg) ||
				error.message ||
				error.toString()
			toast.error(message)
		}

		return {
			msg: error.response.statusText,
			status: error.response.status,
		}
	}
}

// Delete an Education
const deleteEducation = async (id) => {
	try {
		const response = await axios.delete(`/api/profile/education/${id}`)

		toast.success('Education has been deleted')

		return response.data
	} catch (error) {
		const errors = error.response.data.errors
		if (errors) {
			errors.forEach((error) => toast.error(error.msg))
		} else {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.errors &&
					error.response.data.errors[0].msg) ||
				error.message ||
				error.toString()
			toast.error(message)
		}
	}
}

// Delete Account
const deleteAccount = async () => {
	if (window.confirm('Are you sure?  This cannot be undone!!')) {
		try {
			const response = await axios.delete(`/api/profile`)

			toast.success('Account has been deleted')

			return response.data
		} catch (error) {
			const errors = error.response.data.errors
			if (errors) {
				errors.forEach((error) => toast.error(error.msg))
			}

			return {
				msg: error.response.statusText,
				status: error.response.status,
			}
		}
	}
}

const profileService = {
	getCurrentProfile,
	getProfiles,
	getProfileById,
	getGithubRepos,
	createProfile,
	addExperience,
	addEducation,
	deleteExperience,
	deleteEducation,
	deleteAccount,
}

export default profileService
