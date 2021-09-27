import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { signOut } from "firebase/auth";
import { ref, onValue } from '@firebase/database';

import { setProfileNameWithSaga } from '../../store/actions/setProfileName'
import { getProfileWrongNameState } from '../../store/selectors/profileSelectors';
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
	// const profileName = useSelector(getProfileName);
	const dispatch = useDispatch();
	const wrongName = useSelector(getProfileWrongNameState);

	/*handles*/

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
		const unsubscribe = onValue(userName, (snapshot) => {
			const data = snapshot.val();
			setProfileName(data);
		});
		return unsubscribe;
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
			</div>
			<p><span className={(!profileName) ? classes.hidden:''}>Hi, </span>{profileName}<span className={(!profileName) ? classes.hidden:''}>!</span></p>
			<button onClick={signOutUser}>Sign Out</button>
		</div>
	);
}

export default Profile;
