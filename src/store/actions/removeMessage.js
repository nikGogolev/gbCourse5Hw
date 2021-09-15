export const REMOVE_MESSAGE = 'CHATS::REMOVE_MESSAGE'

export const removeMessage = (chatId, messageId, eventId) => {
    return { 
        type: 'CHATS::REMOVE_MESSAGE',
		chatId, 
		messageId,
		eventId
    };
}