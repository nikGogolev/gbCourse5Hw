import React, { useState, useEffect, useRef } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import './chat.css';
import Message from '../Message'
import ChatList from '../ChatList'

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
	
	const classes = useStyles();
	
	const [messageTheme, setMessageTheme] = useState('');
	const [messageText, setMessageText] = useState('');
	const [messageAuthor, setMessageAuthor] = useState('');
	
	const {chatId} = useParams();
	
	const isFirstRender = useRef(true);
	
	const formText = useRef(null);
	
	useEffect(() => {
		if(!!chatId && !!props.chats[chatId]){formText.current.focus();}
		
	}, [props.chats, chatId]);
	
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
	
	useEffect(() => {
					clearForm();
					const prevMess = !!chatId && !!props.chats[chatId] && props.chats[chatId].messages;
					setTimeout(() => {
						if (!!chatId && prevMess.length && (prevMess[prevMess.length - 1]?.author !== 'Bot')){
							props.addMessage(chatId, 'Bot-header', 'Bot lorem ipsum text', 'Bot', null)
						};
						isFirstRender.current = false;
					}, 1000);
	}, [props.chats, chatId, props]);
	
	if (!!chatId && !props.chats[chatId]) {
	  return <Redirect to="/nochat" />;
	}
	
	return (
		<div className="main-container">
			<ChatList chatList={props.chats} addChat={props.addChat} removeChat={props.removeChat}/>
			<div className="chat-container">
			<Message messages={!!chatId ? props.chats[chatId].messages : []} deleteMessage={() => props.removeMessage(chatId)}/>
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
