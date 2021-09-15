import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {Provider } from 'react-redux'

import { ThemeProvider, createTheme,} from "@material-ui/core/styles";

import './App.css'
import Main from './Main'
import Chat from './Chat'
import Profile from './Profile'
import store from './store/store'
import {currentChat} from './store/actions/currentChat'

const mainTheme = createTheme({
	palette: {
		primary: {
			main: "#708238",
		},
		secondary: {
			main: "#0098FF",
		},
	},
});

function App() {
	/*render*/
	return (
		<Provider store={store}>
			<ThemeProvider theme={mainTheme}>
				<BrowserRouter>
						<div className="App">
							<header className="app-header">
								<Link to='/'>Main</Link>
								<Link to='/chats' onClick = {() => store.dispatch(currentChat('', null))}>Chats</Link>
								<Link to='/profile'>Profile</Link>
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
								<Route exact path='/'>
									<Main/>
								</Route>
								<Route>
									<h4>404</h4>
								</Route>
							</Switch>
						</div>
					</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
