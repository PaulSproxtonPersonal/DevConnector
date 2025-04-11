import { v4 as uuidv4 } from 'uuid'

const setAlert = (alert) => {
	const id = uuidv4()
	const { type, message } = alert

	const newAlert = {
		id,
		type,
		message,
	}

	return newAlert
}

const alertService = {
	setAlert,
}

export default alertService
