import React, {useCallback} from 'react';

import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './message.css';
import {removeMessage} from '../store/actions/removeMessage';
import {getCurrentChatId} from '../store/selectors/ChatSelectors';

const useStyles = makeStyles((theme) => ({
	button: {
		position: 'absolute',
		top: '0',
		right: '0',
	},
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

function Message(props) {
	
	/*store*/
	const dispatch = useDispatch();
	const currentChatId = useSelector(getCurrentChatId);
	
	/*handles*/
	const handleRemoveMessage = useCallback((chatId, messageId, event) => {
		dispatch(removeMessage(chatId, messageId, event))
	},[dispatch]);

	/*styles*/
	const classes = useStyles();
	
	/*render*/
	return (
		props.messages.map((message, i) => 
			<article key={message.id} className="message" id={message.id}>
				<h2 className="massage-header"><span className="small-text">Theme: </span>{message.header}</h2>
				<p className="message-text"><span className="small-text">Message: </span>{message.text}</p>
				<p className="message-author"><cite><span className="small-text">Author: </span>{message.author}</cite></p>
				<IconButton onClick={(event) => handleRemoveMessage(currentChatId, message.id, event)} aria-label="delete" className={classes.button+" delete-button"} >
					<DeleteIcon color="secondary"/>
				</IconButton>
			</article>
		)
	);
}

export default Message;
