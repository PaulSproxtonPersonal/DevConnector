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

const profileService = {
	getCurrentProfile,
	createProfile,
}

export default profileService
