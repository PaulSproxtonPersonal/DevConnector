import Moment from 'react-moment'
import { deleteEducation } from '../../features/profile/profileSlice'
import { useDispatch } from 'react-redux'

function Education({ education }) {
	const dispatch = useDispatch()

	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td className='hide-sm'>{edu.degree}</td>
			<td>
				<Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
				{edu.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
			</td>
			<td>
				<button className='btn btn-danger' onClick={() => dispatch(deleteEducation(edu._id))}>
					Delete
				</button>
			</td>
		</tr>
	))
	return (
		<>
			<h2 className='my-2'>Education</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>School</th>
						<th className='hide-sm'>Degree</th>
						<th className='hide-sm'>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</>
	)
}

export default Education
