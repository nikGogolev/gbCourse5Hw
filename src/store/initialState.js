import {STATUSES} from '../utils/constants';

const initialState = {
	profile: {
		name:'Name',
	},
	chats: {},
	news: {
		newsList: [],
		error: {status: false, message:''},
		status: STATUSES.IDLE,
	},
	
};

export default initialState;