const initialState = {
	profile: {
		checkboxState: false,
		name:'Name',
		wrongName: false,
	},
	chats: {
			'chatId1':{
				name: 'chat1',
				id: 'chatId1',
				messages: []
			},
			'chatId2':{
				name: 'chat2',
				id: 'chatId2',
				messages: []
			}},
};

export default initialState;