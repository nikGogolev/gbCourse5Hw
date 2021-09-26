import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { onAuthStateChanged } from "firebase/auth";

import Main from '../Main';
import Chat from '../Chat';
import Profile from '../Profile';
import News from '../News';
import SignUp from '../SignUp';
import LogIn from '../LogIn';
import PrivateRoute from '../../hocs/PrivateRoute';
import PublicRoute from '../../hocs/PublicRoute';
import { auth } from '../../services/firebase';

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

	/*styles*/
	const classes = useStyles();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				//const uid = user.uid;
				setAuthed(true);
			} else {
				setAuthed(false);
			}
		});
		return unsubscribe;
	}, []);

	/*render*/
	return (
		<BrowserRouter>
			<header className={classes.header}>
				<Link to='/'>Main</Link>
				<Link to='/chats'>Chats</Link>
				<Link to='/profile'>Profile</Link>
				<Link to='/news'>News</Link>
				<Link to='/signup'>Registration</Link>
				<Link to='/login'>Login</Link>
			</header>
			<Switch>
				<PrivateRoute authenticated={authed} path="/chats/:chatId?">
					<Chat />
				</PrivateRoute>
				<PrivateRoute authenticated={authed} path='/profile'>
					<Profile />
				</PrivateRoute>
				<PublicRoute authenticated={authed} path='/nochat'>
					<h4>Здесь рыбы нет</h4>
				</PublicRoute>
				<PrivateRoute authenticated={authed} path='/news'>
					<News />
				</PrivateRoute>
				<PublicRoute authenticated={authed} path='/signup'>
					<SignUp />
				</PublicRoute>
				<PublicRoute authenticated={authed} path='/login'>
					<LogIn />
				</PublicRoute>
				<PublicRoute exact authenticated={authed} path='/'>
					<Main />
				</PublicRoute>
				<Route authenticated={authed}>
					<h4>404</h4>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
