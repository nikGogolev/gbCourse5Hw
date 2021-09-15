export const CURRENT_CHAT = 'CHATS::CURRENT_CHAT'

export const currentChat = (currentChat, event) => {
    return { 
        type: 'CHATS::CURRENT_CHAT',
        currentChat,
		event
    };
}