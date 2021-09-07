import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './chatList.css';

const useStyles = makeStyles((theme) => ({
	button: {
		color: '#fff',
  },
  link: {
	  textDecoration: 'none',
	  color: theme.palette.primary.main,
  },
  root: {
    '& > *': {

	  },
    },
	
  
}));

function ChatList(props) {
	const classes = useStyles();
	
	return (
		<div className={classes.root+" chat-list-container"}>
			<List component="nav" aria-label="main mailbox folders">
				{Object.values(props.chatList).map((chat, i) => 
				<Link to={'/chats/chatId'+chat.id}  className={classes.link} key={Object.keys(props.chatList)[i]}>
					<ListItem button className={classes.root} >
					
						<ListItemText primary={chat.name}/>
						
						
						<IconButton aria-label="close" onClick={(event) => props.removeChat(Object.keys(props.chatList)[i], event)}>
							<CloseIcon />
						</IconButton>
					</ListItem>
					</Link>
				)}
			</List>
			<Button value="Add"
				variant="contained"
				color="primary"
				className={classes.button+" add-chat"}
				onClick={props.addChat}
			>
			Add chat
			</Button>
		</div>
	);
}

export default ChatList;
