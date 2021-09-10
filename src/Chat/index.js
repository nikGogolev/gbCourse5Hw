import React, { useState, useEffect, useRef } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import './chat.css';
import Message from '../Message'
import ChatList from '../ChatList'

import currentChat from '../store/actionCreators/currentChat'

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
	
	/*state, props*/
	const [messageTheme, setMessageTheme] = useState('');
	const [messageText, setMessageText] = useState('');
	const [messageAuthor, setMessageAuthor] = useState('');
	const formText = useRef(null);
	const {chats} = props;
	const {updateCurrentChat} = props;
	
	/*roures*/
	const {chatId} = useParams();
	
	/*store*/
	const dispatch = useDispatch();
	!!chatId && dispatch(currentChat(chatId));
	
	/*styles*/
	const classes = useStyles();
	
	/*methods*/
	const handleChangeTheme = (event) => {
		setMessageTheme(event.target.value);
	};
	
	const handleChangeText = (event) => {
		setMessageText(event.target.value);
	};
	
	const handleChangeAuthor = (event) => {
		setMessageAuthor(event.target.value);
	};
	
	const clearForm = () => {
		setMessageTheme('');
		setMessageText('');
		setMessageAuthor('');
	};
	
	/*effects*/
	useEffect(() => {
		if(!!chatId && !!chats[chatId]){formText.current.focus();}
		updateCurrentChat(chatId);
	}, [chats, chatId, updateCurrentChat]);
	
	useEffect(() => {
		clearForm();
	}, [chats]);
	
	/*render*/
	if (!!chatId && !props.chats[chatId]) {
		return <Redirect to="/nochat" />;
	}
	
	return (
		<div className="main-container">
			<ChatList chatList={props.chats} addChat={props.addChat} removeChat={props.removeChat} active={chatId} />
			<div className="chat-container">
				<Message messages={!!chatId ? props.chats[chatId].messages : []} deleteMessage={props.removeMessage} chatId={chatId}/>
				{!!chatId && <form action="" onSubmit={(event) => props.addMessage(chatId, messageTheme, messageText, messageAuthor, event)} className={classes.root+" form"} noValidate autoComplete="off">
					<TextField className="form-text" value={messageTheme} onChange={handleChangeTheme} id="outlined-basic" label="Theme" variant="outlined"/>
					<TextField className="form-text" value={messageText} onChange={handleChangeText} inputRef={formText} multiline={true} rows="5" id="outlined-basic" label="Message" variant="outlined"/>
					<div className="send-group">
						<TextField required className="form-name" value={messageAuthor} onChange={handleChangeAuthor} id="standard-basic" label="Name" variant="standard"/>
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
