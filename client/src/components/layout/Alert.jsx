import { useSelector } from 'react-redux'

const Alert = () => {
	const alerts = useSelector((state) => state.alert)
	let myDiv = null

	return (
		<div className='alert-wrapper'>
			{alerts.alerts !== null &&
				alerts.alerts.length > 0 &&
				alerts.alerts.map((alert) => (
					<div key={alert.id} className={`alert alert-${alert.type}`}>
						{alert.message}
					</div>
				))}
		</div>
	)
}

export default Alert
