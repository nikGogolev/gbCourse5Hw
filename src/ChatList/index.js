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
	
	/*styles*/
	const classes = useStyles();
	
	/*render*/
	return (
		<div className={classes.root+" chat-list-container"}>
			<List component="nav" aria-label="main mailbox folders">
				{Object.values(props.chatList).map((chat) => 
				<Link to={'/chats/'+chat.id}  className={classes.link} key={chat.id} >
					<ListItem button className={chat.id === props.active ? classes.active : classes.root} >					
						<ListItemText primary={chat.name}/>
						<IconButton aria-label="close" onClick={(event) => props.removeChat(chat.id, event)}>
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
