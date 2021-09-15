import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import './chat.css';
import Message from '../Message'
import ChatList from '../ChatList'

import {addMessage} from '../store/actions/addMessage';
import {getChats} from '../store/selectors/ChatSelectors';
import {getProfileName} from '../store/selectors/ProfileSelectors';
import {currentChat} from '../store/actions/currentChat'

const useStyles = makeStyles((theme) => ({
	button: {
		margin: '0 10px',
	},
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

function Chat(props) {
	
	/*state*/
	const [messageTheme, setMessageTheme] = useState('');
	const [messageText, setMessageText] = useState('');
	const messageAuthor = useSelector(getProfileName);
	const formText = useRef(null);

	/*roures*/
	const {chatId} = useParams();
	
	
	/*store*/
	const chats = useSelector(getChats);
	const dispatch = useDispatch();
	
	
	/*styles*/
	const classes = useStyles();
	
	/*handles*/
	const handleAddMessage = useCallback((chatId, messageTheme, messageText, messageAuthor, event) => {
		if (event){event.preventDefault();}
		dispatch(addMessage(chatId, messageTheme, messageText, messageAuthor));
	},[dispatch]);
	
	const handleChangeTheme = (event) => {
		setMessageTheme(event.target.value);
	};
	
	const handleChangeText = (event) => {
		setMessageText(event.target.value);
	};
	
	const clearForm = () => {
		setMessageTheme('');
		setMessageText('');
	};
	
	/*effects*/
	useEffect(() => {
		!!chatId && dispatch(currentChat(chatId));
	}, [])
	
	useEffect(() => {
		if(!!chatId && !!chats[chatId]) formText.current.focus();
	}, [chats, chatId]);
	
	useEffect(() => {
		clearForm();
		
		let timeout;
		
		const prevMess = !!chatId && !!chats[chatId] && chats[chatId].messages;
		if (!!chatId && prevMess.length && (prevMess[prevMess.length - 1]?.author !== 'Bot')){
			timeout = setTimeout(() => {
				handleAddMessage(chatId, 'Bot-header', 'Bot lorem ipsum text', 'Bot', null)
			}, 2000);
		}
		return () => {clearTimeout(timeout)};
	}, [chats]);
	
	/*render*/
	if (!!chatId && !chats[chatId]) {
		return <Redirect to="/chats" />;
	}
	
	return (
		<div className="main-container">
			<ChatList chatList={chats} active={chatId} />
			<div className="chat-container">
				<Message messages={!!chatId ? chats[chatId].messages : []}/>
				{!!chatId && <form action="" onSubmit={(event) => handleAddMessage(chatId, messageTheme, messageText, messageAuthor, event)} className={classes.root+" form"} noValidate autoComplete="off">
					<TextField className="form-text" value={messageTheme} onChange={handleChangeTheme} id="outlined-basic" label="Theme" variant="outlined"/>
					<TextField className="form-text" value={messageText} onChange={handleChangeText} inputRef={formText} multiline={true} rows="5" id="outlined-basic" label="Message" variant="outlined"/>
					<div className="send-group">
						<Button type="submit" value="Send"
							variant="contained"
							color="primary"
							className={classes.button+" form-submit"}
							endIcon={<Icon>send</Icon>}
						>
						Send
						</Button>
					</div>
				</form>}
			</div>
		</div>
	);
}

export default Chat;
