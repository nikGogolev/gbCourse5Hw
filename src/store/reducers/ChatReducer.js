import {ADD_CHAT} from '../actions/addChat'
import {REMOVE_CHAT} from '../actions/removeChat'
import {ADD_MESSAGE} from '../actions/addMessage'
import {REMOVE_MESSAGE} from '../actions/removeMessage'

import initialState from '../initialState'
const {chats} = initialState;

function ChatReducer(state = chats, action) {
    switch(action.type) {
        case ADD_CHAT: 
			const newChatId = `chatId${+new Date()}`;
			return{
				...state,
				[newChatId]: {name: action.chatName, id: newChatId, messages: []}
			};
			
		case REMOVE_CHAT:
			delete state[action.chatId];
			return Object.assign({},state);
			
		case ADD_MESSAGE:
			if (!!action.chatId && !!state[action.chatId]){
				return {
					...state,
					[action.chatId]: {...state[action.chatId],
						messages: [...state[action.chatId].messages, {header: action.messageTheme, text: action.messageText, author: action.messageAuthor, id: `message-${+(new Date())}`}]
					}
				};
			}
			return state;
			
		case REMOVE_MESSAGE:
			const newMessages = !!action.chatId && !!state[action.chatId] && state[action.chatId].messages.filter(({id}) => id !== action.messageId);
			//let find = prevMess_remove.find((element) => {return element.id === action.messageId});
			//prevMess_remove.splice(prevMess_remove.indexOf(find), 1);
			return {
					...state,
					[action.chatId]: {...state[action.chatId],
						messages: [...newMessages]
					}
				};
			//return Object.assign({},state);
        
        default: return state;
    }
}

export default ChatReducer;