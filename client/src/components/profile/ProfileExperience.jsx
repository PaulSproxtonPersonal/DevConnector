import Moment from 'react-moment'

function ProfileExperience({
	experience: { company, title, location, current, to, from, description },
}) {
	return (
		<div>
			<h3 className='text-dark'>{company}</h3>
			{from && (
				<p>
					<Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
					{current ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
				</p>
			)}
			{location && (
				<p>
					<strong>Location: </strong> {location}
				</p>
			)}
			<p>
				<strong>Position: </strong> {title}
			</p>
			{description && (
				<p>
					<strong>Description: </strong> {description}
				</p>
			)}
		</div>
	)
}

export default ProfileExperience
