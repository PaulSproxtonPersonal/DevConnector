import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentProfile } from '../../features/profile/profileSlice'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

function Dashboard() {
	const dispatch = useDispatch()

	const { isLoading, profile } = useSelector((state) => state.profile)
	const { user } = useSelector((state) => state.auth)

	useEffect(() => {
		dispatch(getCurrentProfile())
	}, [])

	return isLoading && profile === null ? (
		<Spinner />
	) : (
		<>
			<div className='container'>
				<h1 className='large text-primary'>Dashboard</h1>
				<p className='lead'>
					<i className='fas fa-user' /> Welcome {user && user.name}
				</p>
				{profile !== null ? (
					<>has</>
				) : (
					<>
						<p>You have not yet setup a profile, please add some info</p>
						<Link to='/create-profile' className='btn btn-primary my-1'>
							Create Profile
						</Link>
					</>
				)}
			</div>
		</>
	)
}

export default Dashboard
