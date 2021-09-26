import React from 'react';
import {Link} from 'react-router-dom'



function Main(props) {
	

	

	return (
		<div className="main-container">
			<h1>Welcome to chat</h1>
			<div>
				<Link to="/login">Sign In</Link>
			</div>
			<div>
				<Link to="/signup">Sign Up</Link>
			</div>
			
		</div>
	);
}

export default Main;
