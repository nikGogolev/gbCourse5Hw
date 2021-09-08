import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './message.css';

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
	const classes = useStyles();
	
  return (
  
    props.messages.map((message, i) => 

		<article key={message.id} className="message" id={message.id}>
			<h2 className="massage-header"><span className="small-text">Theme: </span>{message.header}</h2>
			<p className="message-text"><span className="small-text">Message: </span>{message.text}</p>
			<p className="message-author"><cite><span className="small-text">Author: </span>{message.author}</cite></p>
			<IconButton onClick={(e) => props.deleteMessage(props.chatId, message.id, e)} aria-label="delete" className={classes.button+" delete-button"} >
				<DeleteIcon color="secondary"/>
			</IconButton>
		</article>
	)
  );
}

export default Message;
