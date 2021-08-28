import './Message.css';

function Message(props) {
  return (
    <h1 className="Message-header">Hello, <span className="Message-span">{props.name}</span></h1>
  );
}

export default Message;
