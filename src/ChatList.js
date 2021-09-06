import React from 'react';
import './ChatList.css';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
	button: {
		position: 'absolute',
		top: '0',
		right: '0',
  },
  root: {
    '& > *': {
		color: theme.palette.primary.main,
	  },
    },
	
  
}));

function ChatList(props) {
	const classes = useStyles();
	
	return (
		<div className={classes.root+" chat-list-container"}>
			<List component="nav" aria-label="main mailbox folders">
				{props.chatList.map((chat) => 
					<ListItem button key={chat.id}  className={classes.root}>
						<ListItemText primary={chat.name}/>
						<IconButton aria-label="close">
							<CloseIcon />
						</IconButton>
					</ListItem>
				)}
			</List>
		</div>
	);
}

export default ChatList;
