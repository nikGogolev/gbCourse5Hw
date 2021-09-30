import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function AddChatForm(props) {

	/*render*/
	return (
		<form onSubmit={(event) => props.handleAddChat(props.chatName, event)} className={props.classes.addChatForm}>
			<TextField className={props.classes.chatName} value={props.chatName} onChange={props.hanldeChatName} id="outlined-basic" label="Chat name" variant="outlined" size="small" />
			<Button value="Add"
				variant="contained"
				color="primary"
				className={props.classes.button}
				type="submit"
				testid="addChatBtn"
				role="addChatBtn"
			>
				Add chat
			</Button>
		</form>
	);
}

export default AddChatForm;
