import {STATUSES} from '../utils/constants';

const initialState = {
	profile: {
		checkboxState: false,
		name:'Name',
		wrongName: false,
	},
	chats: {},
	news: {
		newsList: [],
		error: {status: false, message:''},
		status: STATUSES.IDLE,
	},
	
};

export default initialState;