import initialState from '../initialState';
import { INIT_CHATS } from '../actions/initChats';
const { chats } = initialState;

function chatReducer(state = chats, action) {
	switch (action.type) {
		case INIT_CHATS:
			return {
				...action.chats
			};

		default: return state;
	}
};

export default chatReducer;