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
		if (value.isSuccess) {
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
				state.isSuccess = true
				state.profile = action.payload
			})
			.addCase(getCurrentProfile.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.profile = null
				state.message = action.payload
			})
	},
})

export default profileSlice.reducer
