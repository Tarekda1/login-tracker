import './App.css';
import 'semantic-ui-css/semantic.min.css';
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Sessions from './pages/Sessions';
import Login from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
function App() {
	return (
		<Router>
			<Switch>
				<PrivateRoute exact path="/sessions" component={Sessions} />
				<Route path="/login">
					<Login />
				</Route>
				<Redirect from="*" to="/sessions" />
			</Switch>
		</Router>
	);
}

export default App;
