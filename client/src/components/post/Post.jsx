import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../../features/post/postSlice'
import Spinner from '../layout/Spinner'
import { useParams, Link } from 'react-router-dom'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

function Post() {
	const dispatch = useDispatch()
	const params = useParams()

	const { isLoading, post } = useSelector((state) => state.post)

	useEffect(() => {
		dispatch(getPost(params.id))
	}, [dispatch, params.id])

	return isLoading || post === null ? (
		<Spinner />
	) : (
		<div className='container'>
			<Link to='/posts' className='btn'>
				Back to Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			<div className='comments'>
				{post.comments.map((comment) => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</div>
	)
}

export default Post
