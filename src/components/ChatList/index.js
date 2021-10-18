import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ChatList(props) {

	/*render*/
	return (
		<List component="nav" aria-label="main mailbox folders">
			{Object.values(props.chats).map((chat) => 
				<Link to={'/gbCourse5Hw/chats/'+chat.id}  className={props.classes.link} key={chat.id} >
					<ListItem button className={chat.id === props.chatId ? props.classes.active : props.classes.root} >					
						<ListItemText primary={chat.name} />
						<IconButton aria-label="close" onClick={(event) => props.handleRemoveChat(chat.id, event)}>
							<CloseIcon />
						</IconButton>
					</ListItem>
				</Link>
			)}
		</List>
	);

};

export default ChatList;
