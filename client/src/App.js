import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { loadUser } from './features/auth/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './components/routing/PrivateRoute'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadUser())
	}, [])

	return (
		<>
			<Router>
				<Navbar />
				<Alert />
				<Routes>
					<Route exact path='/' element={<Landing />} />
					<Route exact path='/register' element={<Register />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/dashboard' element={<PrivateRoute />}>
						<Route exact path='/dashboard' element={<Dashboard />} />
					</Route>
					<Route exact path='/create-profile' element={<PrivateRoute />}>
						<Route exact path='/create-profile' element={<CreateProfile />} />
					</Route>
				</Routes>
			</Router>

			<ToastContainer />
		</>
	)
}

export default App
