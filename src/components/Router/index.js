import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { onAuthStateChanged } from "firebase/auth";

import { initProfileNameWithSaga } from '../../store/actions/initProfileName';

import Main from '../Main';
import Chat from '../Chat';
import Profile from '../Profile';
import News from '../News';
import SignUp from '../SignUp';
import LogIn from '../LogIn';
import PrivateRoute from '../../hocs/PrivateRoute';
import PublicRoute from '../../hocs/PublicRoute';
import { auth } from '../../services/firebase';
import {HOMEPAGE} from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
	header: {
		display: 'flex',
		justifyContent: 'space-around',
		minHeight: '50px',
		alignItems: 'center',

		'&>a': {
			display: 'flex',
			alignItems: 'center',
			height: '50px',
			textDecoration: 'none',
			backgroundColor: '#ccc',
			color: '#708238',
			padding: '0 30px',
		}
	},
	message: {
		border: '1px solid black',
		borderRadius: '10px',
		marginBottom: '10px',
		position: 'relative',
	},
	messageHeader: {
		textAlign: 'left',
		margin: '10px 20px',
	},
	messageText: {
		textAlign: 'left',
		margin: '10px 20px',
	},
	messageAuthor: {
		textAlign: 'right',
		margin: '10px 20px',
	},
	smallText: {
		fontSize: '14px',
		color: '#AAA',
		fontWeight: 'normal',
	},
}));

function App() {
	

	const [authed, setAuthed] = useState(false);
	
	const dispatch = useDispatch();

	/*styles*/
	const classes = useStyles();
	useEffect(() => {

		if (authed) {dispatch(initProfileNameWithSaga());};
		
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(initProfileNameWithSaga());
				setAuthed(true);
			} else {
				setAuthed(false);
			}
		});
		return unsubscribe;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/*render*/
	return (
		<BrowserRouter>
			<header className={classes.header}>
				<Link to={`${HOMEPAGE}/`}>Main</Link>
				<Link to={`${HOMEPAGE}/chats`}>Chats</Link>
				<Link to={`${HOMEPAGE}/profile`}>Profile</Link>
				<Link to={`${HOMEPAGE}/news`}>News</Link>
				<Link to={`${HOMEPAGE}/signup`}>Registration</Link>
				<Link to={`${HOMEPAGE}/login`}>Login</Link>
			</header>
			<Switch>
				<PrivateRoute authenticated={authed} path={`${HOMEPAGE}/chats/:chatId?`}>
					<Chat />
				</PrivateRoute>
				<PrivateRoute authenticated={authed} path={`${HOMEPAGE}/profile`}>
					<Profile />
				</PrivateRoute>
				<PublicRoute authenticated={authed} path={`${HOMEPAGE}/nochat`}>
					<h4>Здесь рыбы нет</h4>
				</PublicRoute>
				<PrivateRoute authenticated={authed} path={`${HOMEPAGE}/news`}>
					<News />
				</PrivateRoute>
				<PublicRoute authenticated={authed} path={`${HOMEPAGE}/signup`}>
					<SignUp />
				</PublicRoute>
				<PublicRoute authenticated={authed} path={`${HOMEPAGE}/login`}>
					<LogIn />
				</PublicRoute>
				<PublicRoute exact authenticated={authed} path={`${HOMEPAGE}/`}>
					<Main />
				</PublicRoute>
				<Route authenticated={authed}>
					<h4>404</h4>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
