import {ADD_CHAT} from '../actions/addChat'
import {REMOVE_CHAT} from '../actions/removeChat'
import {ADD_MESSAGE} from '../actions/addMessage'
import {REMOVE_MESSAGE} from '../actions/removeMessage'

import initialState from '../initialState'
const {chats} = initialState;

function chatReducer(state = chats, action) {
    switch(action.type) {
        case ADD_CHAT: 
			const newChatId = `chatId${+new Date()}`;
			return{
				...state,
				[newChatId]: {name: action.chatName, id: newChatId, messages: []}
			};
			
		case REMOVE_CHAT:
			delete state[action.chatId];
			return {
				...state
			};
			
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
			return {
					...state,
					[action.chatId]: {...state[action.chatId],
						messages: [...newMessages]
					}
				};

        
        default: return state;
    }
}

export default chatReducer;