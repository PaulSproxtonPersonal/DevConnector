import Moment from 'react-moment'

function ProfileEducation({
	education: { school, degree, from, current, to, fieldofstudy, description },
}) {
	return (
		<div>
			<div>
				<h3 className='text-dark'>{school}</h3>
				{from && (
					<p>
						<Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
						{current ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
					</p>
				)}
				{fieldofstudy && (
					<p>
						<strong>Field of Study: </strong> {fieldofstudy}
					</p>
				)}
				<p>
					<strong>Degree or Certification: </strong> {degree}
				</p>
				{description && (
					<p>
						<strong>Description: </strong> {description}
					</p>
				)}
			</div>
		</div>
	)
}

export default ProfileEducation
