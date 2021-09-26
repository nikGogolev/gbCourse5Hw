export const ADD_MESSAGE = 'CHATS::ADD_MESSAGE'

export const addMessage = (chatId, messageTheme, messageText, messageAuthor) => {
    return { 
        type: ADD_MESSAGE,
		chatId, 
		messageTheme, 
		messageText, 
		messageAuthor, 
    };
}

export const ADD_MESSAGE_WITH_SAGA = 'CHATS::ADD_MESSAGE_WITH_SAGA'

export const addMessageWithSaga = (chatId, messageTheme, messageText, messageAuthor) => {
    return { 
        type: ADD_MESSAGE_WITH_SAGA,
		chatId, 
		messageTheme, 
		messageText, 
		messageAuthor, 
    };
}