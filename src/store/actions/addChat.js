export const ADD_CHAT = 'CHATS::ADD_CHAT'

export const addChat = (chatName) => {
    return { 
        type: ADD_CHAT,
		chatName
    };
}