export const REMOVE_MESSAGE = 'CHATS::REMOVE_MESSAGE';

export const removeMessage = (chatId, messageId) => {
    return {
        type: REMOVE_MESSAGE,
        chatId,
        messageId,
    };
};

export const REMOVE_MESSAGE_WITH_SAGA = 'CHATS::REMOVE_MESSAGE_WITH_SAGA';

export const removeMessageWithSaga = (chatId, messageId) => {
    return {
        type: REMOVE_MESSAGE_WITH_SAGA,
        chatId,
        messageId,
    };
};