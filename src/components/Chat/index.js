import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Message from '../Message';
import ChatListContainer from '../ChatListContainer';
import SendForm from '../SendForm';

import { getChats } from '../../store/selectors/chatSelectors';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-around',
		backgroundColor: '#EEE',
	},

	chat: {
		maxWidth: '700px',
		display: 'flex',
		flexDirection: 'column',
		padding: '15px',
		flexGrow: 1,
	}
}));

function Chat(props) {
	/*styles*/
	const classes = useStyles();

	/*roures*/
	const { chatId } = useParams();

	/*store*/

	const chats = useSelector(getChats);

	const MessagePure = React.memo(Message);

	/*render*/
	if (!!chatId && !chats[chatId]) {
		return <Redirect to="/gbCourse5Hw/chats" />;
	}

	return (
		<div className={classes.root}>
			<ChatListContainer chatList={chats} active={chatId} chatId={chatId} />
			<div className={classes.chat}>
				<MessagePure messages={(!!chatId && chats[chatId].messages) ? Object.values(chats[chatId].messages) : []} chatId={chatId} />
				{!!chatId && <SendForm />}
			</div>
		</div>
	);
};

export default Chat;
