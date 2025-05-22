import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
	user: {
		id: '',
		name: '',
		email: '',
		avatar: '',
	},
	isError: false,
	isSuccess: false,
	isLoading: false,
	isAuthenticated: false,
	message: '',
}

// Register new user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
	try {
		return await authService.register(user)
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

// Login existing user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user)
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

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout()
})

// Load user data
export const loadUser = createAsyncThunk('auth/loadUser', async (thunkAPI) => {
	try {
		return await authService.loadUser()
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

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isAuthenticated = true
				state.user = action.payload
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.user = null
				state.isError = true
				state.isAuthenticated = false
				state.message = action.payload
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isAuthenticated = true
				state.user = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.user = null
				state.isError = true
				state.isAuthenticated = false
				state.message = action.payload
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null
				state.isAuthenticated = false
			})
			.addCase(loadUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(loadUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isAuthenticated = true
				state.user = action.payload
			})
			.addCase(loadUser.rejected, (state, action) => {
				state.isLoading = false
				state.user = null
				state.isError = true
				state.isAuthenticated = false
				state.message = action.payload
				localStorage.removeItem('user')
			})
	},
})

export const { reset } = authSlice.actions
export default authSlice.reducer
