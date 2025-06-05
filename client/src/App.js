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
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadUser())
	}, [])

	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route exact path='/' element={<Landing />} />
					<Route exact path='/register' element={<Register />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/profiles' element={<Profiles />} />
					<Route exact path='/profile/:id' element={<Profile />} />
					<Route exact path='/dashboard' element={<PrivateRoute />}>
						<Route exact path='/dashboard' element={<Dashboard />} />
					</Route>
					<Route exact path='/create-profile' element={<PrivateRoute />}>
						<Route exact path='/create-profile' element={<CreateProfile />} />
					</Route>
					<Route exact path='/edit-profile' element={<PrivateRoute />}>
						<Route exact path='/edit-profile' element={<EditProfile />} />
					</Route>
					<Route exact path='/add-experience' element={<PrivateRoute />}>
						<Route exact path='/add-experience' element={<AddExperience />} />
					</Route>
					<Route exact path='/add-education' element={<PrivateRoute />}>
						<Route exact path='/add-education' element={<AddEducation />} />
					</Route>
				</Routes>
			</Router>

			<ToastContainer />
		</>
	)
}

export default App
