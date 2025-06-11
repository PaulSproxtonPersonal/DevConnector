import { useEffect } from 'react'
import { getPosts } from '../../features/post/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

function Posts() {
	const dispatch = useDispatch()

	const { isLoading, posts } = useSelector((state) => state.post)

	useEffect(() => {
		dispatch(getPosts())
	}, [dispatch])

	return isLoading ? (
		<Spinner />
	) : (
		<div className='container'>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome to the community
			</p>
			<PostForm />
			<div className='posts'>
				{posts.map((post) => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</div>
	)
}

export default Posts
