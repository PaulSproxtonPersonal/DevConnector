import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false)
	const [checkingStatus, setCheckingStatus] = useState(true)

	const { isAuthenticated } = useSelector((state) => state.auth)

	useEffect(() => {
		if (isAuthenticated) {
			setLoggedIn(true)
		} else {
			setLoggedIn(false)
		}

		setCheckingStatus(false)
	}, [isAuthenticated])

	return { loggedIn, checkingStatus }
}
