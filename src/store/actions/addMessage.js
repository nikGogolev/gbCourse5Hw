export const ADD_MESSAGE = 'CHATS::ADD_MESSAGE'

export const addMessage = (chatId, messageTheme, messageText, messageAuthor) => {
    return { 
        type: 'CHATS::ADD_MESSAGE',
		chatId, 
		messageTheme, 
		messageText, 
		messageAuthor, 
    };
}