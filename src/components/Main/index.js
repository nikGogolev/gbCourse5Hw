import React from 'react';
import {Link} from 'react-router-dom';
import {HOMEPAGE} from '../../utils/constants';

function Main(props) {

	return (
		<div className="main-container">
			<h1>Welcome to chat</h1>
			<div>
				<Link to={`${HOMEPAGE}/login`}>Sign In</Link>
			</div>
			<div>
				<Link to={`${HOMEPAGE}/signup`}>Sign Up</Link>
			</div>
			
		</div>
	);
};

export default Main;
