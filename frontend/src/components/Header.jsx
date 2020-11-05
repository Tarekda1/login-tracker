import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Menu } from 'semantic-ui-react';
import './Header.css';

const Header = () => {
	const [ activeItem, setActiveItem ] = useState('');
	const history = useHistory();
	const handleItemClick = (e, name) => {
		switch (name) {
			case 'logout':
				sessionStorage.removeItem('token');
				history.push('/login');
			case 'othersessions':
				history.push('/othersessions');
			case 'mysessions':
				history.push('/mysessions');
		}
	};
	return (
		<Segment className="headerWrapper">
			<h1>Login Tracker</h1>
			<Menu className="headerWrapper__menu" secondary>
				<Menu.Item
					name="mysessions"
					active={activeItem === 'mysessions'}
					onClick={(e) => handleItemClick(e, 'mysessions')}
				>
					My Sessions
				</Menu.Item>
				<Menu.Item
					name="othersessions"
					active={activeItem === 'othersessions'}
					onClick={(e) => handleItemClick(e, 'othersessions')}
				>
					Other Users Sessions
				</Menu.Item>
				<Menu.Item name="logout" active={activeItem === 'logout'} onClick={(e) => handleItemClick(e, 'logout')}>
					Logout
				</Menu.Item>
			</Menu>
		</Segment>
	);
};

export default Header;
