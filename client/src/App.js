import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'

const App = () => {
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
