import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { register, loadUser, reset } from '../../features/auth/authSlice'
import { setAlert, removeAlert } from '../../features/alert/alertSlice'
import Spinner from '../layout/Spinner'

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})

	const { name, email, password, password2 } = formData

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

	useEffect(() => {
		if (isError) {
			const alertData = {
				message,
				type: 'danger',
			}

			const myAlert = dispatch(setAlert(alertData))
			setTimeout(() => {
				myAlert.then((val) => dispatch(removeAlert(val.payload.id)))
			}, 5000)
		}

		// Redirect when logged in
		if (isSuccess || user) {
			navigate('/')
			dispatch(reset())
		}
	}, [isError, isSuccess, user, message, navigate, dispatch])

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = async (e) => {
		e.preventDefault()

		if (password !== password2) {
			const alertData = {
				message: 'Passwords do not match',
				type: 'danger',
			}

			dispatch(setAlert(alertData))
		} else {
			const userData = {
				name,
				email,
				password,
			}

			dispatch(register(userData))
		}
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className='container'>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a Gravatar email
					</small>
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
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						minLength='6'
						value={password2}
						onChange={onChange}
						required
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</div>
	)
}

export default Register
