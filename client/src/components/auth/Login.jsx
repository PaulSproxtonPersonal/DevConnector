import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../features/auth/authSlice'
import Spinner from '../layout/Spinner'

const Login = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})

	const { email, password } = formData

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { isAuthenticated, isLoading, isSuccess } = useSelector((state) => state.auth)

	useEffect(() => {
		// Redirect when logged in
		if (isSuccess || isAuthenticated) {
			navigate('/dashboard')
			dispatch(reset())
		}
	}, [isSuccess, isAuthenticated, navigate, dispatch])

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = async (e) => {
		e.preventDefault()

		const userData = {
			email,
			password,
		}

		dispatch(login(userData))
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className='container'>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Sign Into Your Account
			</p>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						minLength='6'
						value={password}
						onChange={onChange}
						required
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</div>
	)
}

export default Login
