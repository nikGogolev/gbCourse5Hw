import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import './profile.css';
import profileCheckboxAction from '../store/actionCreators/profileCheckbox'


function Profile(props) {
	
	/*store*/
	const profileCheckboxState = useSelector((state) => state.profileCheckbox);
	const dispatch = useDispatch();
	const handleCheckbox = () => {
		dispatch(profileCheckboxAction(!profileCheckboxState));
	};
	
	/*render*/
	return (
		<div className="profile-container">
			<h1>My Profile</h1>
			<div>
				<input id="display-my-name" 
					type="checkbox" 
					checked={profileCheckboxState} 
					onChange={handleCheckbox} 
					value={profileCheckboxState}>
				</input>
				<label htmlFor="display-my-name">Display my name</label>
			</div>
			<p className={profileCheckboxState ? "" : "hidden"}>My name</p>
		</div>
	);
}

export default Profile;
