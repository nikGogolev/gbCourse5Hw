import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

import './chatList.css';

import {addChat} from '../store/actions/addChat';
import {removeChat} from '../store/actions/removeChat';
import {currentChat} from '../store/actions/currentChat'
import {getChats} from '../store/selectors/ChatSelectors';

const useStyles = makeStyles((theme) => ({
	button: {
		color: '#fff',
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.primary.main,
	},
	active: {
		color: theme.palette.secondary.main,
		backgroundColor: '#ccc',
	},
	root: {
		'& > *': {
		},
	},
}));

function ChatList(props) {
	
	/*state*/
	const[chatName, setChatName] = useState('');
	
	/*store*/
	const dispatch = useDispatch();
	const currentChatId = useSelector(state => state.currentChat);
	const chats = useSelector(getChats, shallowEqual);
	
	/*handles*/
	const handleAddChat = useCallback((chatName, event) => {
		event.preventDefault();
		dispatch(addChat(chatName));
		setChatName('');
	}, [dispatch]);
	
	const handleRemoveChat = (chatId, event) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch(removeChat(chatId));
	};
	
	const handleCurrentChat = (chatId, event) => {
		dispatch(currentChat(chatId, event));
	};
	
	const hanldeChatName = (event) => {
		setChatName(event.target.value);
	};
	
	/*styles*/
	const classes = useStyles();
	
	/*render*/
	return (
		<div className={classes.root+" chat-list-container"}>
			<List component="nav" aria-label="main mailbox folders">
				{Object.values(chats).map((chat) => 
				<Link to={'/chats/'+chat.id}  className={classes.link} key={chat.id} onClick={(event) => handleCurrentChat(chat.id, event)}>
					<ListItem button className={chat.id === currentChatId ? classes.active : classes.root} >					
						<ListItemText primary={chat.name} />
						<IconButton aria-label="close" onClick={(event) => handleRemoveChat(chat.id, event)}>
							<CloseIcon />
						</IconButton>
					</ListItem>
					</Link>
				)}
			</List>
			<form onSubmit={(event) => handleAddChat(chatName, event)}>
				<TextField className="chat-name" value={chatName} onChange={hanldeChatName} id="outlined-basic" label="Chat name" variant="outlined"/>
				<Button value="Add"
					variant="contained"
					color="primary"
					className={classes.button+" add-chat"}
					type="submit"
				>
				Add chat
				</Button>
			</form>
		</div>
	);
}

export default ChatList;
