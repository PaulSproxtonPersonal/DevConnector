import axios from 'axios'

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

const profileService = {
	getCurrentProfile,
}

export default profileService
