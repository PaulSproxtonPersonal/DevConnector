import { useEffect } from 'react'
import Spinner from '../layout/Spinner'
import { getGithubRepos, getProfileById } from '../../features/profile/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

function Profile() {
	const dispatch = useDispatch()

	const params = useParams()

	const { profile, isLoading, isGithubLoading } = useSelector((state) => state.profile)
	const { isAuthenticated, isLoading: isAuthLoading, user } = useSelector((state) => state.auth)

	useEffect(() => {
		console.log('Calling getProfileById')
		dispatch(getProfileById(params.id))
		// if (profile.githubusername) {
		// 	dispatch(getGithubRepos(profile.githubusername))
		// }
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
						<div className='profile-exp bg-white p-2'>
							<h2 className='text-primary'>Experience</h2>
							{profile.experience.length > 0 ? (
								<>
									{profile.experience.map((experience) => (
										<ProfileExperience key={experience._id} experience={experience} />
									))}
								</>
							) : (
								<h4>No Experience credentials</h4>
							)}
						</div>
						<div className='profile-edu bg-white p-2'>
							<h2 className='text-primary'>Education</h2>
							{profile.education.length > 0 ? (
								<>
									{profile.education.map((education) => (
										<ProfileEducation key={education._id} education={education} />
									))}
								</>
							) : (
								<h4>No Education credentials</h4>
							)}
						</div>

						{profile.githubusername && <ProfileGithub username={profile.githubusername} />}
					</div>
				</div>
			)}
		</>
	)
}

export default Profile
