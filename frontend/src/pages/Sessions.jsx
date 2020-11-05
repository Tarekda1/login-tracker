import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { Loader, Segment, Tab, Table } from 'semantic-ui-react';

function Sessions() {
	const [ listOfSessions, setlistOfSessions ] = useState([]);
	const [ progress, setprogress ] = useState(false);
	const token = sessionStorage.getItem('token');
	useEffect(async () => {
		console.log(token);
		async function fetchSessions() {
			const { data: { sessions } } = await axios.get('http://localhost:2000/session/getSessionByLoggedInUser', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			setprogress(true);
			await setlistOfSessions(sessions);
			setprogress(false);
		}
		fetchSessions();
		return () => {};
	}, []);
	return (
		<div>
			<Header />
			<Segment>
				{progress ? (
					<div style={{ minHeight: '100px' }}>
						<Loader active="true" size="medium">
							Loading
						</Loader>
					</div>
				) : (
					<Table>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Id</Table.HeaderCell>
								<Table.HeaderCell>firstName</Table.HeaderCell>
								<Table.HeaderCell>lastName</Table.HeaderCell>
								<Table.HeaderCell>email</Table.HeaderCell>
								<Table.HeaderCell>session time</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{listOfSessions.map(({ _id, createdAt, user: { firstName, email, lastName } }) => {
								return (
									<Table.Row key={_id}>
										<Table.Cell>{_id}</Table.Cell>
										<Table.Cell>{firstName}</Table.Cell>
										<Table.Cell>{lastName}</Table.Cell>
										<Table.Cell>{email}</Table.Cell>
										<Table.Cell>{createdAt}</Table.Cell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table>
				)}
			</Segment>
		</div>
	);
}

export default Sessions;
