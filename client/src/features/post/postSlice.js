import postService from './postService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	posts: [],
	post: null,
	isLoading: true,
	isError: false,
	isSuccess: false,
	message: '',
}

export const getPosts = createAsyncThunk('post/getPost', async (thunkAPI) => {
	try {
		let value = await postService.getPosts()
		if (value.msg === undefined || value.msg === null) {
			return value
		} else {
			// The Profile was not successfully returned
			return thunkAPI.rejectWithValue('The profile could not be retrieved')
		}
	} catch (error) {
		console.log('Get posts error:', error)
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

export const addLike = createAsyncThunk('/post/addLike', async (postId, thunkAPI) => {
	try {
		let value = await postService.addLike(postId)
		if (value.msg === undefined || value.msg === null) {
			return value
		} else {
			// The Profile was not successfully returned
			return thunkAPI.rejectWithValue('The like could not be added')
		}
	} catch (error) {
		console.log('Add like error:', error)
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

export const removeLike = createAsyncThunk('/post/removeLike', async (postId, thunkAPI) => {
	try {
		let value = await postService.removeLike(postId)
		if (value.msg === undefined || value.msg === null) {
			return value
		} else {
			// The Profile was not successfully returned
			return thunkAPI.rejectWithValue('The like could not be removed')
		}
	} catch (error) {
		console.log('Remove like error:', error)
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

export const deletePost = createAsyncThunk('/post/deletePost', async (postId, thunkAPI) => {
	try {
		let value = await postService.deletePost(postId)
		if (value === postId) {
			return value
		} else {
			// The Profile was not successfully returned
			return thunkAPI.rejectWithValue('The post could not be deleted')
		}
	} catch (error) {
		console.log('Delete post error:', error)
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

export const addPost = createAsyncThunk('/post/addPost', async (formData, thunkAPI) => {
	try {
		let value = await postService.addPost(formData)
		if (value.msg === undefined || value.msg === null) {
			return value
		} else {
			// The Profile was not successfully returned
			return thunkAPI.rejectWithValue('The like could not be removed')
		}
	} catch (error) {
		console.log('Add post error:', error)
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

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		clearPost: (state) => {
			state.post = ''
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPosts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.isSuccess = true
				state.isLoading = false
				state.posts = action.payload
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.isSuccess = false
				state.isLoading = false
				state.isError = true
				state.posts = []
				state.message = action.payload
			})
			.addCase(addLike.pending, (state) => {
				state.isLoading = true
			})
			.addCase(addLike.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.posts.map((post) =>
					post._id === action.payload.postId ? (post.likes = action.payload.data) : {}
				)
			})
			.addCase(addLike.rejected, (state, action) => {
				state.isError = true
				state.isSuccess = false
				state.isLoading = false
				state.message = action.payload
			})
			.addCase(removeLike.pending, (state) => {
				state.isLoading = true
			})
			.addCase(removeLike.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.posts.map((post) =>
					post._id === action.payload.postId ? (post.likes = action.payload.data) : {}
				)
			})
			.addCase(removeLike.rejected, (state, action) => {
				state.isError = true
				state.isSuccess = false
				state.isLoading = false
				state.message = action.payload
			})
			.addCase(deletePost.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.isSuccess = true
				state.isLoading = false
				state.posts = state.posts.filter((post) => post._id !== action.payload)
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.isSuccess = false
				state.isError = true
				state.isLoading = false
				state.message = action.payload
			})
			.addCase(addPost.pending, (state) => {
				state.isLoading = true
			})
			.addCase(addPost.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.posts = [action.payload, ...state.posts]
			})
			.addCase(addPost.rejected, (state, action) => {
				state.isError = true
				state.isSuccess = false
				state.isLoading = false
				state.message = action.payload
			})
	},
})

export default postSlice.reducer
