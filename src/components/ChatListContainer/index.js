import React, {useState, useCallback} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';

import ChatList from '../ChatList';
import AddChatForm from '../AddChatForm';
import {addChat} from '../../store/actions/addChat';
import {removeChat} from '../../store/actions/removeChat';
import {getChats} from '../../store/selectors/chatSelectors';

const useStyles = makeStyles((theme) => ({
	button: {
		color: '#fff',
		whiteSpace: 'noWrap',
		height: '100%',
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.primary.main,
	},
	active: {
		color: theme.palette.secondary.main,
		backgroundColor: '#ccc',
	},
	chatName: {
		marginRight: '10px',
	},
	root: {
		maxWidth: '300px',
		padding: '15px',
	},
	addChatForm: {
		display: 'flex',
		alignItems: 'center'
	}
}));

function ChatListContainer(props) {
	
	/*state*/
	const[chatName, setChatName] = useState('');
	
	/*store*/
	const dispatch = useDispatch();
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

	const hanldeChatName = (event) => {
		setChatName(event.target.value);
	};
	
	/*styles*/
	const classes = useStyles();
	
	/*render*/
	return (
		<div className={classes.root}>
			<AddChatForm handleAddChat={handleAddChat} classes={classes} chatName={chatName} hanldeChatName={hanldeChatName}/>
			<ChatList chats={chats} classes={classes} handleRemoveChat={handleRemoveChat} chatId={props.chatId}/>
		</div>
	);
}

export default ChatListContainer;
