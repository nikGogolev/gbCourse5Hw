import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { removeMessageWithSaga } from '../../store/actions/removeMessage';

const useStyles = makeStyles((theme) => ({
	button: {
		position: 'absolute',
		top: '0',
		right: '0',
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
		whiteSpace: 'pre-wrap'
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

function Message(props) {

	/*store*/
	const dispatch = useDispatch();

	/*handles*/
	const handleRemoveMessage = useCallback((chatId, messageId) => {
		dispatch(removeMessageWithSaga(chatId, messageId))
	}, [dispatch]);

	/*styles*/
	const classes = useStyles();

	/*render*/
	return (
		props.messages.map((message, i) =>
			<article key={message.id} className={classes.message} id={message.id}>
				<h2 className={classes.messageHeader}><span className={classes.smallText}>Theme:<br /></span>{message.header}</h2>
				<p className={classes.messageText}><span className={classes.smallText}>Message:<br /></span>{message.text}</p>
				<p className={classes.messageAuthor}><cite><span className={classes.smallText}>Author: </span>{message.author}</cite></p>
				<IconButton onClick={() => handleRemoveMessage(props.chatId, message.id)} aria-label="delete" className={classes.button + " delete-button"} >
					<DeleteIcon color="secondary" />
				</IconButton>
			</article>
		)
	);
};

export default Message;
