import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import {addMessageWithSaga} from '../../store/actions/addMessage';
import {getProfileName} from '../../store/selectors/profileSelectors';

const useStyles = makeStyles((theme) => ({
	root: {
		border: '1px solid black',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	text: {
		height: 'auto',
	},
	button: {
		alignSelf: 'flex-end',
	},
}));

function SendForm(props) {
	
	/*state*/
	const [messageTheme, setMessageTheme] = useState('');
	const [messageText, setMessageText] = useState('');
	const messageAuthor = useSelector(getProfileName);
	const formText = useRef(null);

	/*roures*/
	const {chatId} = useParams();
	
	
	/*store*/
	const dispatch = useDispatch();
	
	/*styles*/
	const classes = useStyles();
	
	/*handles*/
	const handleAddMessage = useCallback((chatId, messageTheme, messageText, messageAuthor, event) => {
		clearForm();
		formText.current.focus()
		if (event){event.preventDefault();}
		dispatch(addMessageWithSaga(chatId, messageTheme, messageText, messageAuthor));
	},[dispatch]);
	
	const handleChangeTheme = (event) => {
		setMessageTheme(event.target.value);
	};
	
	const handleChangeText = (event) => {
		setMessageText(event.target.value);
	};
	
	const clearForm = () => {
		setMessageTheme('');
		setMessageText('');
	};
	
	/*effects*/
	useEffect(() => {
		if(!!chatId) formText.current.focus();
	}, [chatId]);
	
	return (
		<form action="" onSubmit={(event) => handleAddMessage(chatId, messageTheme, messageText, messageAuthor, event)} className={classes.root} noValidate autoComplete="off">
			<TextField className={classes.text} value={messageTheme} onChange={handleChangeTheme} id="outlined-basic" label="Theme" variant="outlined"/>
			<TextField className={classes.text} value={messageText} onChange={handleChangeText} inputRef={formText} multiline={true} rows="5" id="outlined-basic" label="Message" variant="outlined"/>
			<Button type="submit" value="Send"
				variant="contained"
				color="primary"
				className={classes.button}
				endIcon={<Icon>send</Icon>}
			>
			Send
			</Button>
		</form>
	);
}

export default SendForm;
