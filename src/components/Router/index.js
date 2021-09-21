import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Main from '../Main'
import Chat from '../Chat'
import Profile from '../Profile'
import News from '../News'

const useStyles = makeStyles((theme) => ({
	header: {
		display: 'flex',
		justifyContent: 'space-around',
		minHeight: '50px',
		alignItems: 'center',
		
		'&>a':{
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
	
	/*styles*/
	const classes = useStyles();
	
	/*render*/
	return (
		<BrowserRouter>
			<header className={classes.header}>
				<Link to='/'>Main</Link>
				<Link to='/chats'>Chats</Link>
				<Link to='/profile'>Profile</Link>
				<Link to='/news'>News</Link>
			</header>
			<Switch>
				<Route path='/chats/:chatId?'>
					<Chat/>
				</Route>
				<Route path='/profile'>
					<Profile/>
				</Route>
				<Route path='/nochat'>
					<h4>Здесь рыбы нет</h4>
				</Route>
				<Route path='/news'>
					<News/>
				</Route>
				<Route exact path='/'>
					<Main/>
				</Route>
				<Route>
					<h4>404</h4>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
