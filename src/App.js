import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Message from './Message.js'
import ChatList from './ChatList.js'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import {
 ThemeProvider,
 createTheme,
} from "@material-ui/core/styles";



const mainTheme = createTheme({
 palette: {
   primary: {
     main: "#708238",
   },
   secondary: {
     main: "#0098FF",
   },
 },
});

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 10px',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function App() {
	
	const classes = useStyles();
	
	const [messageList, setMessageList] = useState([]);
	const [messageTheme, setMessageTheme] = useState('');
	const [messageText, setMessageText] = useState('');
	const [messageAuthor, setMessageAuthor] = useState('');
	const [chatList, setChatList] = useState(
	[	{name: 'Chat 1', id:'1'},
		{name: 'Chat 2', id:'2'},
		{name: 'Chat 3', id:'3'},
		{name: 'Chat 4', id:'4'},
		{name: 'Chat 5', id:'5'},
		{name: 'Chat 6', id:'6'},
		{name: 'Chat 7', id:'7'},
		{name: 'Chat 8', id:'8'},

	]);
	
	const isFirstRender = useRef(true);
	
	const formText = useRef(null);
	
	useEffect(() => {
		formText.current.focus();
	}, [messageList]);
	
	const handleChangeTheme = (event) => {
		setMessageTheme(event.target.value);
	};
	
	const handleChangeText = (event) => {
		setMessageText(event.target.value);
	};
	
	const handleChangeAuthor = (event) => {
		setMessageAuthor(event.target.value);
	};
	
	const clearForm = () => {
		setMessageTheme('');
		setMessageText('');
		setMessageAuthor('');
	};
	
	const addMessage = (event) => {
		event.preventDefault();
		setMessageList([...messageList, {header: messageTheme, text: messageText, author: messageAuthor, id: `message-${+(new Date())}`}]);
	};
	
	const removeMessage = (id, e) => {
		let find = messageList.find((element) => {return element.id === id});
		messageList.splice(messageList.indexOf(find), 1);
		setMessageList([...messageList]);
	};
	
	useEffect(() => {
					clearForm();
					setTimeout(() => {
						if (messageList.length && (messageList[messageList.length - 1]?.author !== 'Bot')){
							setMessageList([...messageList, {header: 'Bot-header', text: 'Bot lorem ipsum text', author: 'Bot', id: `message-${+(new Date())}`}]);
						};
						isFirstRender.current = false;
					}, 1000);
	}, [messageList]);

  return (
  <ThemeProvider theme={mainTheme}>
    <div className="App main-container">
		<ChatList chatList={chatList}/>
		<div className="chat-container">
		<Message messages={messageList} deleteMessage={removeMessage}/>
		<form action="" onSubmit={addMessage} className={classes.root+" form"} noValidate autoComplete="off">
			<TextField className="form-text" value={messageTheme} onChange={handleChangeTheme} id="outlined-basic" label="Theme" variant="outlined"/>
			<TextField className="form-text" value={messageText} onChange={handleChangeText} inputRef={formText} multiline={true} rows="5" id="outlined-basic" label="Message" variant="outlined"/>
			<div className="send-group">
			<TextField required className="form-name" value={messageAuthor} onChange={handleChangeAuthor} id="standard-basic" label="Name" variant="standard"/>
			
			<Button type="submit" value="Send"
				variant="contained"
				color="primary"
				className={classes.button+" form-submit"}
				endIcon={<Icon>send</Icon>}
			>
			Send
			</Button>
			</div>
		</form>
		</div>
	</div>
	</ThemeProvider>
  );
}

/*
class App extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			messageList: [],
			messageText: '',
			messageAuthor: '',
		};
		
	}
	
	handleChangeText = (event) => {
		this.setState({messageText: event.target.value});
	}
	
	handleChangeAuthor = (event) => {
		this.setState({messageAuthor: event.target.value});
	}
	
	clearForm = () => {
		this.setState({messageText: ''});
		this.setState({messageAuthor: ''});
	}
	
	addMessage = (event) => {
		event.preventDefault();
		this.setState({messageList:  [...this.state.messageList, {header: 'Header', text: this.state.messageText, author: this.state.messageAuthor}]}
		//,() => 	{
		//			this.clearForm();
		//			setTimeout(() => {
		//				if (this.state.messageList[this.state.messageList.length - 1]?.author !== 'Bot'){
		//					this.setState({messageList:  [...this.state.messageList, {header: 'Bot-header', text: 'Bot lorem ipsum text', author: 'Bot'}]});
		//				}
		//			}, 1000);
		//		}
		);
	}
	
	componentDidUpdate(prevProps, prevState){
		if (prevState.messageList.length !== this.state.messageList.length){
			this.clearForm();
			if (this.state.messageList.length && (this.state.messageList[this.state.messageList.length - 1]?.author !== 'Bot')){
				setTimeout(() => this.setState({messageList:  [...this.state.messageList, {header: 'Bot-header', text: 'Bot lorem ipsum text', author: 'Bot'}]}), 1000);
			}
		};
	};

	
	removeMessage = (event) => {
		console.log(event.target.parentElement.getAttribute('id'));
		this.state.messageList.splice(event.target.parentElement.getAttribute('id'), 1);
		this.setState({messageList:  this.state.messageList});
	}
	
	render(){
		return(
			<div className="App">
				<Message messages={this.state.messageList} deleteMessage={this.removeMessage} />
				<form action="" onSubmit={this.addMessage} className="form" >
					<p className="text">Текст сообщения</p>
					<textarea className="form-text" value={this.state.messageText} onChange={this.handleChangeText}/>
					<p className="text">Имя</p>
					<input className="form-name" type="text" value={this.state.messageAuthor} onChange={this.handleChangeAuthor}/>
					<input className="form-submit" type="submit" value="Send"/>
				</form>
			</div>
		);
	}
}
*/
export default App;
