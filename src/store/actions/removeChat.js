export const REMOVE_CHAT = 'CHATS::REMOVE_CHAT'

export const removeChat = (chatId) => {
    return { 
        type: REMOVE_CHAT,
		chatId,
    };
}