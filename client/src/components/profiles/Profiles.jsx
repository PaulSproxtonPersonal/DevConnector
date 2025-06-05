import { useEffect } from 'react'
import Spinner from '../layout/Spinner'
import { getProfiles } from '../../features/profile/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProfileItem from './ProfileItem'

function Profiles() {
	const dispatch = useDispatch()

	const { isLoading, profiles } = useSelector((state) => state.profile)

	useEffect(() => {
		dispatch(getProfiles())
	}, [dispatch])

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='container'>
					<h1 className='large text-primary'>Developers</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop'></i> Browse and connect with developers
					</p>
					<div className='profiles'>
						{profiles.length > 0 ? (
							profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)
						) : (
							<h4>No profiles found</h4>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default Profiles
