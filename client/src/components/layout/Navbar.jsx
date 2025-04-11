import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'

const Navbar = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)

	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate('/')
	}
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> DevConnector
				</Link>
			</h1>
			<ul>
				<li>
					<Link to='profiles.html'>Developers</Link>
				</li>
				{user ? (
					<li>
						<button className='btn-dark' onClick={onLogout}>
							Logout
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to='/register'>Register</Link>
						</li>
						<li>
							<Link to='/login'>Login</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}

export default Navbar
