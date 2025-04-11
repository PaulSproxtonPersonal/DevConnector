import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import alertService from './alertService'

const initialState = []

export const setAlert = createAsyncThunk('alert/setAlert', async (alert, thunkAPI) => {
	try {
		return await alertService.setAlert(alert)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

export const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(setAlert.fulfilled, (state, action) => {
			state = state.unshift(action.payload)
		})
	},
})

export default alertSlice.reducer
