import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import TextField from '@material-ui/core/TextField';

import './profile.css';
import {toggleProfileCheckbox} from '../store/actions/toggleProfileCheckbox'
import {setProfileName} from '../store/actions/setProfileName'
import {getProfileCheckboxState} from '../store/selectors/ProfileSelectors';
import {getProfileName} from '../store/selectors/ProfileSelectors';
import {getProfileWrongNameState} from '../store/selectors/ProfileSelectors';


function Profile(props) {
	
	/*state*/
	const [newProfileName, setNewProfileName] = useState('');
	
	/*store*/
	const profileCheckboxState = useSelector(getProfileCheckboxState);
	const profileName = useSelector(getProfileName);
	const dispatch = useDispatch();
	const wrongName = useSelector(getProfileWrongNameState);
	
	/*handles*/
	const handleCheckbox = () => {
		dispatch(toggleProfileCheckbox(!profileCheckboxState));
	};
	
	const handleProfileName = (event) => {
		event.preventDefault();
		dispatch(setProfileName(newProfileName));
		setNewProfileName('');
	};
	
	const handleNewProfileName = (event) => {
		setNewProfileName(event.target.value);
	};
	
	/*render*/
	return (
		<div className="profile-container">
			<h1>My Profile</h1>
			<div>
			<form onSubmit={handleProfileName} className="profile-name">
				<TextField required className="profile-name" value={newProfileName} onChange={handleNewProfileName} id="standard-basic" label="Enter your name" variant="standard"/>
				<span className={(wrongName ? "" : "hidden") + " wrong-name" }>Wrong name!</span>
			</form>
				<input id="display-my-name" 
					type="checkbox" 
					checked={profileCheckboxState} 
					onChange={handleCheckbox} 
					value={profileCheckboxState}>
				</input>
				<label htmlFor="display-my-name">Display my name</label>
			</div>
			<p className={profileCheckboxState ? "" : "hidden"}>{profileName}</p>
		</div>
	);
}

export default Profile;
