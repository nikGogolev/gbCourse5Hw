import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {Provider } from 'react-redux'

import { ThemeProvider, createTheme,} from "@material-ui/core/styles";

import './App.css'
import Main from './Main'
import Chat from './Chat'
import Profile from './Profile'
import store from './store/store'

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
	
	/*state*/
	const [chats, setChats] = useState(
		{	'chatId1':{
				name: 'chat1',
				id: 'chatId1',
				messages: []
			},
			'chatId2':{
				name: 'chat2',
				id: 'chatId2',
				messages: []
			}
		}
	);
	const [currentChat, setCurrentChat] = useState(null);
	
	/*methods*/
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
		const newChatId = `chatId${+new Date()}`;
		chats[newChatId] = {name: `chat${+new Date()}`, id: newChatId, messages: []};
		setChats(Object.assign({},chats));
	}, [chats]);
	
	const removeChat = useCallback((id, event) => {
		delete chats[id];
		setChats(Object.assign({},chats));
		event.preventDefault();
	}, [chats]);
	
	const updateCurrentChat = (chatId) => {
		setCurrentChat(chatId);
	};
	
	/*effects*/
	const chatId = currentChat;
	useEffect(() => {
		let timeout;
		
		const prevMess = !!chatId && !!chats[chatId] && chats[chatId].messages;
		if (!!chatId && prevMess.length && (prevMess[prevMess.length - 1]?.author !== 'Bot')){
			timeout = setTimeout(() => {
				addMessage(chatId, 'Bot-header', 'Bot lorem ipsum text', 'Bot', null)
			}, 2000);
		}
		return () => {clearTimeout(timeout)};
		
	}, [chats, addMessage]);
	
	/*render*/
	return (
		<Provider store={store}>
			<ThemeProvider theme={mainTheme}>
				<BrowserRouter>
						<div className="App">
							<header className="app-header">
								<Link to='/'>Main</Link>
								<Link to='/chats'>Chats</Link>
								<Link to='/profile'>Profile</Link>
							</header>
							<Switch>
								<Route path='/chats/:chatId?'>
									<Chat chats={chats}
										addMessage={addMessage}
										removeMessage={removeMessage}
										addChat={addChat}
										removeChat={removeChat}
										updateCurrentChat={updateCurrentChat}
									/>
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
