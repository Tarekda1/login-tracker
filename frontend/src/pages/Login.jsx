import React, { useState } from 'react';
import { Grid, Header, Message, Segment, Image, Form, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login() {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ progress, setProgress ] = useState(false);
	const [ error, setError ] = useState('');
	let history = useHistory();

	async function onSubmit() {
		console.log('clicked');
		setProgress(true);

		try {
			const { data: { user, token } } = await axios.post('http://localhost:2000/api/signin', {
				email: username,
				password: password
			});
			//const obj = JSON.parse(resp);
			console.log(token);
			if (user && token) {
				//save token
				console.log(token);
				sessionStorage.setItem('token', token);
			}
		} catch (error) {
			console.log(error);
			setError(error);
		} finally {
			setProgress(false);
			//push to home screen
			history.push('/');
		}
	}

	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h2" textAlign="center">
					<p>Login using ur email</p>
				</Header>
				<Segment stacked>
					<div className="card-body" />
					<Form>
						<Form.Input
							fluid
							icon="user"
							iconPosition="left"
							placeholder="E-mail address"
							name="email"
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Form.Input
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							type="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							className={'primary-button'}
							loading={progress}
							fluid
							type="submit"
							size="large"
							onClick={() => onSubmit()}
						>
							Login
						</Button>
					</Form>
				</Segment>
			</Grid.Column>
		</Grid>
	);
}

export default Login;
