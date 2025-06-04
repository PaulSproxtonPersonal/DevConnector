import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import profileService from './profileService'

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	isLoading: true,
	isError: false,
	isSuccess: false,
	message: '',
}

export const getCurrentProfile = createAsyncThunk('profile/getCurrentProfile', async (thunkAPI) => {
	try {
		let value = await profileService.getCurrentProfile()
		if (value._id !== undefined && value._id !== null) {
			return value
		} else {
			// The Profile was not successfully returned
			return thunkAPI.rejectWithValue('The profile could not be retrieved')
		}
	} catch (error) {
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.errors &&
				error.response.data.errors[0].msg) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

export const createProfile = createAsyncThunk(
	'profile/createProfile',
	async (formData, thunkAPI) => {
		try {
			const value = await profileService.createProfile(formData)
			if (value._id !== undefined && value._id !== null) {
				return value
			} else {
				return thunkAPI.rejectWithValue(value)
			}
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.errors &&
					error.response.data.errors[0].msg) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const addExperience = createAsyncThunk(
	'profile/addExperience',
	async (formData, thunkAPI) => {
		try {
			const value = await profileService.addExperience(formData)
			if (value._id !== undefined && value._id !== null) {
				return value
			} else {
				return thunkAPI.rejectWithValue(value)
			}
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.errors &&
					error.response.data.errors[0].msg) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const addEducation = createAsyncThunk('profile/addEducation', async (formData, thunkAPI) => {
	try {
		const value = await profileService.addEducation(formData)
		if (value._id !== undefined && value._id !== null) {
			return value
		} else {
			return thunkAPI.rejectWithValue(value)
		}
	} catch (error) {
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.errors &&
				error.response.data.errors[0].msg) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

export const deleteExperience = createAsyncThunk(
	'profile/deleteExperience',
	async (id, thunkAPI) => {
		try {
			const value = await profileService.deleteExperience(id)
			if (value._id !== undefined && value._id !== null) {
				return value
			} else {
				return thunkAPI.rejectWithValue(value)
			}
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.errors &&
					error.response.data.errors[0].msg) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const deleteEducation = createAsyncThunk('profile/deleteEducation', async (id, thunkAPI) => {
	try {
		const value = await profileService.deleteEducation(id)
		if (value._id !== undefined && value._id !== null) {
			return value
		} else {
			return thunkAPI.rejectWithValue(value)
		}
	} catch (error) {
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.errors &&
				error.response.data.errors[0].msg) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

export const deleteAccount = createAsyncThunk('profile/deleteAccount', async (thunkAPI) => {
	try {
		const value = await profileService.deleteAccount()
		if (value._id !== undefined && value._id !== null) {
			return value
		} else {
			return thunkAPI.rejectWithValue(value)
		}
	} catch (error) {
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.errors &&
				error.response.data.errors[0].msg) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

export const clearProfile = createAsyncThunk('profile/clearProfile', async () => {
	await profileService.clearProfile()
})

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		clearProfile: (state) => {
			state.profile = null
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.repos = []
			state.message = ''
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCurrentProfile.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getCurrentProfile.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.profile = action.payload
			})
			.addCase(getCurrentProfile.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.profile = null
				state.message = action.payload
			})
			.addCase(createProfile.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createProfile.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.profile = action.payload
			})
			.addCase(createProfile.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.profile = null
				state.message = action.payload
			})
			.addCase(addExperience.pending, (state) => {
				state.isLoading = true
			})
			.addCase(addExperience.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.profile = action.payload
			})
			.addCase(addExperience.rejected, (state, action) => {
				state.isLoading = false
				state.message = action.payload
			})
			.addCase(addEducation.pending, (state) => {
				state.isLoading = true
			})
			.addCase(addEducation.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.profile = action.payload
			})
			.addCase(addEducation.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.profile = null
				state.message = action.payload
			})
			.addCase(deleteExperience.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.profile = action.payload
			})
			.addCase(deleteExperience.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deleteEducation.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.profile = action.payload
			})
			.addCase(deleteEducation.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deleteAccount.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.profile = null
			})
			.addCase(deleteAccount.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.profile = null
				state.message = action.payload
			})
	},
})

export default profileSlice.reducer
