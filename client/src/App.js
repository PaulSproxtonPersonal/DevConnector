import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import { loadUser } from './features/auth/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadUser())
	}, [])

	return (
		<Router>
			<Navbar />
			<Alert />
			<Routes>
				<Route exact path='/' element={<Landing />} />
				<Route exact path='/register' element={<Register />} />
				<Route exact path='/login' element={<Login />} />
			</Routes>
		</Router>
	)
}

export default App
