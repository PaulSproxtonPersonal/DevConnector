import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { useSelector, useDispatch } from 'react-redux'
import { addLike, deletePost, removeLike } from '../../features/post/postSlice'

function PostItem({
	post: { _id, text, name, avatar, user, likes, comments, date },
	showActions = true,
}) {
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
				{showActions && (
					<>
						<button onClick={(e) => dispatch(addLike(_id))} type='button' className='btn btn-light'>
							<i className='fas fa-thumbs-up'></i>
							{likes.length > 0 && <span> {likes.length}</span>}
						</button>
						<button
							onClick={(e) => dispatch(removeLike(_id))}
							type='button'
							className='btn btn-light'>
							<i className='fas fa-thumbs-down'></i>
						</button>
						<Link to={`/posts/${_id}`} className='btn btn-primary'>
							Discussion{' '}
							{comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
						</Link>
						{isAuthenticated && isAuthLoading === false && authUser._id === user && (
							<button
								onClick={(e) => {
									dispatch(deletePost(_id))
								}}
								type='button'
								className='btn btn-danger'>
								<i className='fas fa-times'></i>
							</button>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default PostItem
