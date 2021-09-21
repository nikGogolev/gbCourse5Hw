export const REMOVE_MESSAGE = 'CHATS::REMOVE_MESSAGE'

export const removeMessage = (chatId, messageId) => {
    return { 
        type: REMOVE_MESSAGE,
		chatId, 
		messageId,
    };
}