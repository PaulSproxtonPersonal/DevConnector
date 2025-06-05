import { useEffect } from 'react'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../features/profile/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'

function Profile() {
	const dispatch = useDispatch()

	const params = useParams()

	const { profile, isLoading } = useSelector((state) => state.profile)
	const { isAuthenticated, isLoading: isAuthLoading, user } = useSelector((state) => state.auth)

	useEffect(() => {
		dispatch(getProfileById(params.id))
	}, [dispatch, params.id])
	return (
		<>
			{profile === null || isLoading ? (
				<Spinner />
			) : (
				<div className='container'>
					<Link to='/profiles' className='btn btn-light'>
						Back to Profiles
					</Link>
					{isAuthenticated && isAuthLoading === false && user._id === profile.user._id && (
						<Link to='/edit-profile' className='btn btn-dark'>
							Edit Profile
						</Link>
					)}
					<div className='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
					</div>
				</div>
			)}
		</>
	)
}

export default Profile
