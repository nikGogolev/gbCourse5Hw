import React, { useState, useCallback } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

import {
 ThemeProvider,
 createTheme,
} from "@material-ui/core/styles";

import './App.css'
import Main from './Main'
import Chat from './Chat'
import Profile from './Profile'

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
	
	const [chats, setChats] = useState(
		{	'chatId1':{
				name: 'chat1',
				id: '1',
				messages: []
			},
			'chatId2':{
				name: 'chat2',
				id: '2',
				messages: []
			}
		}
	);
	
	const addMessage = useCallback((chatId, messageTheme, messageText, messageAuthor, event) => {
		if (event){event.preventDefault();}		
		const prevMess = !!chatId && !!chats[chatId] && chats[chatId].messages;
		chats[chatId].messages = [...prevMess,{header: messageTheme, text: messageText, author: messageAuthor, id: `message-${+(new Date())}`}];
		setChats(Object.assign({},chats));
	}, [chats]);
	
	const removeMessage = useCallback((chatId, id, e) => {
		const prevMess = !!chatId && !!chats[chatId] && chats[chatId].messages;
		let find = prevMess.find((element) => {return element.id === id});
		prevMess.splice(prevMess.indexOf(find), 1);
		setChats(Object.assign({},chats));
	}, [chats]);
	
	const addChat = useCallback(() => {
		
		chats[`chatId${+new Date()}`] = {name: `chat${+new Date()}`, id: (+new Date()), messages: []};

		setChats(Object.assign({},chats));
	}, [chats]);
	
	const removeChat = useCallback((id, event) => {
		delete chats[id];
		setChats(Object.assign({},chats));
		event.preventDefault();
	}, [chats]);
	
	return (
		
			<ThemeProvider theme={mainTheme}>
			<BrowserRouter>
			<div className="App">
				<Link to='/'>Main</Link>
				<Link to='/chats'>Chats</Link>
				<Link to='/profile'>Profile</Link>
				<Switch>
					<Route path='/chats/:chatId'>
						<Chat chats={chats} addMessage={addMessage} removeMessage={removeMessage} addChat={addChat} removeChat={removeChat}/>
					</Route>
					<Route path='/chats'>
						<Chat chats={chats} addChat={addChat} removeChat={removeChat}/>
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

	);
}

export default App;
