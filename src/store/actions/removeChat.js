export const REMOVE_CHAT = 'CHATS::REMOVE_CHAT'

export const removeChat = (chatId) => {
    return { 
        type: 'CHATS::REMOVE_CHAT',
		chatId,
    };
}