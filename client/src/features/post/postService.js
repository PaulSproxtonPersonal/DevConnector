import axios from 'axios'
import { toast } from 'react-toastify'

// Get posts
const getPosts = async () => {
	try {
		const response = await axios.get('/api/posts')

		return response.data
	} catch (error) {
		console.log('Error:  ', error)
		return {
			msg: error.response.statusText,
			status: error.response.status,
		}
	}
}

// Get a single post
const getPost = async (postId) => {
	try {
		const response = await axios.get(`/api/posts/${postId}`)

		return response.data
	} catch (error) {
		console.log('Error:  ', error)
		return {
			msg: error.response.statusText,
			status: error.response.status,
		}
	}
}

// Add like
const addLike = async (postId) => {
	try {
		const response = await axios.put(`/api/posts/like/${postId}`)

		return { data: response.data, postId }
	} catch (error) {
		console.log('Error:  ', error)
		toast.warning(error.response.data.msg)
		return {
			msg: error.response.data.msg,
			status: error.response.status,
		}
	}
}

// Remove like
const removeLike = async (postId) => {
	try {
		const response = await axios.put(`/api/posts/unlike/${postId}`)

		return { data: response.data, postId }
	} catch (error) {
		console.log('Error:  ', error)
		toast.warning(error.response.data.msg)
		return {
			msg: error.response.data.msg,
			status: error.response.status,
		}
	}
}

// Delete post
const deletePost = async (postId) => {
	try {
		const response = await axios.delete(`/api/posts/${postId}`)

		toast.success('The post has been deleted.')
		return postId
	} catch (error) {
		console.log('Error:  ', error)
		return {
			msg: error.response.statusText,
			status: error.response.status,
		}
	}
}

// Add post
const addPost = async (formData) => {
	try {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		}

		const response = await axios.post('/api/posts', formData, config)

		toast.success('The post was successfully added.')
		return response.data
	} catch (error) {
		console.log('Error:  ', error)
		return {
			msg: error.response.statusText,
			status: error.response.status,
		}
	}
}

// Add comment
const addComment = async (postId, formData) => {
	try {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		}

		const response = await axios.post(`/api/posts/comment/${postId.postId}`, formData, config)

		toast.success('The comment was successfully added.')
		return response.data
	} catch (error) {
		console.log('Error:  ', error)
		return {
			msg: error.response.statusText,
			status: error.response.status,
		}
	}
}

// Delete comment
const deleteComment = async (postId, commentId) => {
	try {
		const response = await axios.delete(`/api/posts/comment/${postId}/${commentId}`)

		toast.success('The comment was successfully deleted.')
		return commentId
	} catch (error) {
		console.log('Error:  ', error)
		return {
			msg: error.response.statusText,
			status: error.response.status,
		}
	}
}

const postService = {
	getPosts,
	getPost,
	addLike,
	removeLike,
	deletePost,
	addPost,
	addComment,
	deleteComment,
}

export default postService
