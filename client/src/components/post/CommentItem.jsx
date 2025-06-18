import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteComment } from '../../features/post/postSlice'
import Moment from 'react-moment'

function CommentItem({ postId, comment: { _id, text, name, avatar, user, date } }) {
	const {
		isAuthenticated,
		isLoading: isAuthLoading,
		user: authUser,
	} = useSelector((state) => state.auth)

	const dispatch = useDispatch()

	return (
		<div className='post bg-white p-1 my-1'>
			<div>
				<Link to={`/profile/${user}`}>
					<img className='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p className='my-1'>{text}</p>
				<p className='post-date'>
					Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
				</p>
				{!isAuthLoading && user === authUser._id && (
					<button
						type='button'
						className='btn btn-danger'
						onClick={(e) => dispatch(deleteComment({ postId, commentId: _id }))}>
						<i className='fas fa-times'></i>
					</button>
				)}
			</div>
		</div>
	)
}

export default CommentItem
