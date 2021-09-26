import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { signOut } from "firebase/auth";
import { ref, onValue } from '@firebase/database';

import { toggleProfileCheckbox } from '../../store/actions/toggleProfileCheckbox'
import { setProfileNameWithSaga } from '../../store/actions/setProfileName'
import { getProfileCheckboxState, getProfileWrongNameState } from '../../store/selectors/profileSelectors';
import { db, auth } from '../../services/firebase';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		backgroundColor: '#EEE',
		flexDirection: 'column',
	},
	profileName: {
		position: 'relative',
	},
	wrongName: {
		position: 'absolute',
		top: '0',
		left: 'calc(50% - 60px)',
		display: 'block',
		padding: '10px',
		background: '#de2345',
	},
	hidden: {
		visibility: 'hidden',
	},
}));

function Profile(props) {

	/*state*/
	const [newProfileName, setNewProfileName] = useState('');
	const [profileName, setProfileName] = useState('');

	/*store*/
	const profileCheckboxState = useSelector(getProfileCheckboxState);
	// const profileName = useSelector(getProfileName);
	const dispatch = useDispatch();
	const wrongName = useSelector(getProfileWrongNameState);

	/*handles*/
	const handleCheckbox = () => {
		dispatch(toggleProfileCheckbox(!profileCheckboxState));
	};

	const handleProfileName = (event) => {
		event.preventDefault();
		dispatch(setProfileNameWithSaga(newProfileName));
		setNewProfileName('');
	};

	const handleNewProfileName = (event) => {
		setNewProfileName(event.target.value);
	};

	useEffect(() => {
		const userName = ref(db, `profile/${auth.currentUser.uid}/username`);
		onValue(userName, (snapshot) => {
			const data = snapshot.val();
			setProfileName(data);
		});
	}, []);


	const signOutUser = () => {
		signOut(auth).then(() => {
		}).catch((error) => {
		});
	};

	/*styles*/
	const classes = useStyles();

	/*render*/
	return (
		<div className={classes.root}>
			<h1>My Profile</h1>
			<div>
				<form onSubmit={handleProfileName} className={classes.profileName}>
					<TextField required className={classes.profileName} value={newProfileName} onChange={handleNewProfileName} id="standard-basic" label="Enter your name" variant="standard" />
					<span className={(wrongName ? "" : classes.hidden) + " " + classes.wrongName}>Wrong name!</span>
				</form>
				<input id="display-my-name"
					type="checkbox"
					checked={profileCheckboxState}
					onChange={handleCheckbox}
					value={profileCheckboxState}>
				</input>
				<label htmlFor="display-my-name">Display my name</label>
			</div>
			<p className={profileCheckboxState ? "" : classes.hidden}>{profileName}</p>
			<button onClick={signOutUser}>Sign Out</button>
		</div>
	);
}

export default Profile;
