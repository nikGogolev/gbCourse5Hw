import React from 'react';
import './Message.css';
/*
function Message(props) {
  return (
    props.messages.map((message, i) => <article key={i} className="message"><h2 className="massage-header">{message.header}</h2><p className="message-text">{message.text}</p><p className="message-author"><cite>{message.author}</cite></p></article>)
  );
}
*/

class Message extends React.Component{

	render(){
		return(
			this.props.messages.map((message, i) => <article key={i} className="message"><h2 className="massage-header">{message.header}</h2><p className="message-text">{message.text}</p><p className="message-author"><cite>{message.author}</cite></p></article>)
		);
	}
}

export default Message;
