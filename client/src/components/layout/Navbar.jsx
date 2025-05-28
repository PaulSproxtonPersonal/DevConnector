import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'

const Navbar = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { isAuthenticated, isLoading } = useSelector((state) => state.auth)

	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate('/')
	}

	const authLinks = (
		<ul>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-user' />
					<span className='hide-sm'> Dashboard</span>
				</Link>
			</li>
			<li>
				<a onClick={onLogout} href='!#'>
					<i className='fas fa-sign-out-alt' /> <span className='hide-sm'>Logout</span>
				</a>
			</li>
		</ul>
	)

	const guestLinks = (
		<ul>
			<li>
				<a href='#!'>Developers</a>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	)

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> DevConnector
				</Link>
			</h1>
			{!isLoading && <>{isAuthenticated ? authLinks : guestLinks}</>}
		</nav>
	)
}

export default Navbar
