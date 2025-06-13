import { useEffect, useState } from 'react'
import { getGithubRepos } from '../../features/profile/profileSlice'
import Spinner from '../layout/Spinner'
import { useDispatch, useSelector } from 'react-redux'

function ProfileGithub({ username }) {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getGithubRepos(username))
	}, [dispatch, username])

	const { repos } = useSelector((state) => state.profile)
	console.log('Repos:', repos)
	return (
		<div className='profile-github'>
			<h2 className='text-primary my-1'>Github Repos</h2>
			{repos === null ? (
				<Spinner />
			) : (
				repos.map((repo) => (
					<div className='repo bg-white p1 my-1' key={repo._id}>
						<div>
							<h4>
								<a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
									{repo.name}
								</a>
							</h4>
							<p>{repo.description}</p>
						</div>
						<div>
							<ul>
								<li className='badge badge-primary'>Stars: {repo.stargazers_count}</li>
								<li className='badge badge-dark'>Watchers: {repo.watchers_count}</li>
								<li className='badge badge-light'>Forks: {repo.forks_count}</li>
							</ul>
						</div>
					</div>
				))
			)}
		</div>
	)
}

export default ProfileGithub
