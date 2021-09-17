import React, { useState, useEffect } from 'react';
import './App.css';
import Message from './Message.js'
/*
function App() {
	
	const [messageList, setMessageList] = useState([]);
	const [messageText, setMessageText] = useState('');
	const [messageAuthor,setMessageAuthor] = useState('');
	
	const handleChangeText = (event) => {
		setMessageText(event.target.value);
	}
	
	const handleChangeAuthor = (event) => {
		setMessageAuthor(event.target.value);
	}
	
	const clearForm = () => {
		setMessageText('');
		setMessageAuthor('');
	}
	
	const addMessage = (event) => {
		event.preventDefault();
		setMessageList([...messageList, {header: 'Header', text: messageText, author: messageAuthor}]);
	}
	
	useEffect(() => {
					clearForm();
					setTimeout(() => {
						if (messageList.length && (messageList[messageList.length - 1]?.author !== 'Bot')){
							setMessageList([...messageList, {header: 'Bot-header', text: 'Bot lorem ipsum text', author: 'Bot'}]);
						}
					}, 1000);
	}, [messageList]);
	
  return (
    <div className="App">
		<Message messages={messageList} />
		<form action="" onSubmit={addMessage} className="form">
			<p className="text">Текст сообщения</p>
			<textarea className="form-text" value={messageText} onChange={handleChangeText}/>
			<p className="text">Имя</p>
			<input className="form-name" type="text" value={messageAuthor} onChange={handleChangeAuthor}/>
			<input className="form-submit" type="submit" value="Send"/>
		</form>
	</div>
  );
}
*/

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
		this.setState({messageList:  [...this.state.messageList, {header: 'Header', text: this.state.messageText, author: this.state.messageAuthor}]}, 
		() => 	{
					this.clearForm();
					setTimeout(() => {
						if (this.state.messageList[this.state.messageList.length - 1]?.author !== 'Bot'){
							this.setState({messageList:  [...this.state.messageList, {header: 'Bot-header', text: 'Bot lorem ipsum text', author: 'Bot'}]});
						}
					}, 1000);
				});
	}
	
	render(){
		return(
			<div className="App">
				<Message messages={this.state.messageList} />
				<form action="" onSubmit={this.addMessage} className="form">
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

export default App;
