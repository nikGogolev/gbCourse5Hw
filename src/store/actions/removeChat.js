export const REMOVE_CHAT = 'CHATS::REMOVE_CHAT';

export const removeChat = (chatId) => {
    return {
        type: REMOVE_CHAT,
        chatId,
    };
};

export const REMOVE_CHAT_WITH_SAGA = 'CHATS::REMOVE_CHAT_WITH_SAGA';

export const removeChatWithSaga = (chatId) => {
    return {
        type: REMOVE_CHAT_WITH_SAGA,
        chatId,
    };
};